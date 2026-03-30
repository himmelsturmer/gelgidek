import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Fetching all countries...');
  await page.goto('https://www.vizedunyasi.com/tum-ulkeler', { waitUntil: 'load' });
  const countryLinks = await page.$$eval('#icerik a', links => {
     return links
        .filter(a => a.getAttribute('href') && a.getAttribute('href').includes('/vizebilgisi/'))
        .map(a => ({ name: a.innerText.trim(), url: a.href }));
  });
  
  // Deduplicate
  const uniqueCountries = [];
  const seen = new Set();
  for(const c of countryLinks) {
     if(!seen.has(c.url) && c.name) {
        seen.add(c.url);
        uniqueCountries.push(c);
     }
  }
  console.log(`Found ${uniqueCountries.length} countries.`);

  const allScrapedData = [];

  // Scrape synchronously for stability, Playwright can handle it, maybe ~15 mins running time.
  // We'll scrape just a few for demonstration or let it run fully. 
  // Let's scrape ALL of them!
  for (let i = 0; i < uniqueCountries.length; i++) {
    const country = uniqueCountries[i];
    console.log(`[${i+1}/${uniqueCountries.length}] Scraping ${country.name}...`);
    const cPage = await browser.newPage();
    
    try {
      await cPage.goto(country.url, { waitUntil: 'load', timeout: 60000 });
      
      const purposes = await cPage.$$eval('#ContentPlaceHolder1_ddlGidisAmaci option', opts => 
        opts.map(o => ({ value: o.value, text: o.textContent.trim() })).filter(v => v.value !== '-1')
      );
      
      if (purposes.length === 0) {
        // No dropdowns, maybe just static data
        const data = await extractData(cPage);
        allScrapedData.push({
           country: country.name, countrySlug: country.url.split('/').pop(),
           purpose: 'Genel', profession: 'Genel', ...data
        });
      } else {
         for (const purpose of purposes) {
            // Select purpose
            await Promise.all([
               cPage.waitForResponse(res => res.url().includes('vizebilgisi') && res.request().method() === 'POST').catch(()=>null),
               cPage.$eval('#ContentPlaceHolder1_ddlGidisAmaci', (el, val) => {
                 el.value = val; el.dispatchEvent(new Event('change', { bubbles: true }));
               }, purpose.value).catch(()=>null)
            ]);
            await cPage.waitForTimeout(1000);
            
            const professions = await cPage.$$eval('#ContentPlaceHolder1_ddlMeslek option', opts => 
              opts.map(o => ({ value: o.value, text: o.textContent.trim() })).filter(v => v.value !== '-1')
            );
            
            if (professions.length === 0) {
                const data = await extractData(cPage);
                allScrapedData.push({
                   country: country.name, countrySlug: country.url.split('/').pop(),
                   purpose: purpose.text, profession: 'Genel', ...data
                });
            } else {
                for (const prof of professions) {
                    await Promise.all([
                       cPage.waitForResponse(res => res.url().includes('vizebilgisi') && res.request().method() === 'POST').catch(()=>null),
                       cPage.$eval('#ContentPlaceHolder1_ddlMeslek', (el, val) => {
                         el.value = val; el.dispatchEvent(new Event('change', { bubbles: true }));
                       }, prof.value).catch(()=>null)
                    ]);
                    await cPage.waitForTimeout(1000);
                    
                    const data = await extractData(cPage);
                    allScrapedData.push({
                       country: country.name, countrySlug: country.url.split('/').pop(),
                       purpose: purpose.text, profession: prof.text, ...data
                    });
                }
            }
         }
      }
    } catch(err) {
      console.error(`Error scraping ${country.name}:`, err.message);
    } finally {
      await cPage.close();
      // Periodically save to avoid losing data
      fs.writeFileSync('data_scraped.json', JSON.stringify(allScrapedData, null, 2));
    }
  }
  
  console.log('Finished scraping all countries!');
  browser.close();
})();

async function extractData(page) {
    return await page.evaluate(() => {
        const result = {
            documentList: [], applicationZones: [], processingTime: '', description: '',
            embassyRaw: '', consulateRaw: '', pdfs: []
        };
        
        const evrakBlocks = Array.from(document.querySelectorAll('.vizeonemli'));
        evrakBlocks.forEach(b => {
           const h3 = b.querySelector('h3');
           if(h3 && h3.innerText.includes('Evraklar')) {
               result.documentList = Array.from(b.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);
           }
           if(h3 && h3.innerText.includes('Açıklama')) {
               result.description = Array.from(b.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean).join('\\n');
           }
        });
        
        const pTimeDiv = document.querySelector('#ContentPlaceHolder1_divIslemSuresi');
        if(pTimeDiv) result.processingTime = pTimeDiv.innerText.replace('İşlem Süresi','').trim();
        
        const appZoneDiv = document.querySelector('#ContentPlaceHolder1_divBasvuruBolge');
        if(appZoneDiv) result.applicationZones = Array.from(appZoneDiv.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);
        
        const embassyDiv = document.querySelector('#ContentPlaceHolder1_divElcilik');
        if(embassyDiv) result.embassyRaw = embassyDiv.innerText.replace('Büyük Elçilik','').trim();
        
        const consulateDiv = document.querySelector('#ContentPlaceHolder1_divKonsolos');
        if(consulateDiv) result.consulateRaw = consulateDiv.innerText.replace('Konsolosluk','').trim();
        
        const PDFLinks = Array.from(document.querySelectorAll('.formList li a.formLink')).filter(a => a.href && a.href.includes('/uploads/'));
        result.pdfs = PDFLinks.map(a => ({ url: a.href, label: a.innerText.trim() }));
        
        return result;
    });
}
