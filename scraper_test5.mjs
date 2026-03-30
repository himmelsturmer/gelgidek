import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.vizedunyasi.com/vizebilgisi/almanya', { waitUntil: 'load' });

  const purposes = await page.$$eval('#ContentPlaceHolder1_ddlGidisAmaci option', options => 
    options.map(opt => ({ value: opt.value, text: opt.textContent.trim() })).filter(opt => opt.value !== '-1')
  );
  
  if (purposes.length > 0) {
    const purpose = purposes[0];
    
    console.log(`Selecting purpose: ${purpose.text}`);
    await Promise.all([
      page.waitForResponse(response => response.url().includes('almanya') && response.request().method() === 'POST'),
      page.$eval('#ContentPlaceHolder1_ddlGidisAmaci', (el, val) => {
        el.value = val;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, purpose.value)
    ]);
    await page.waitForTimeout(1000);

    const professions = await page.$$eval('#ContentPlaceHolder1_ddlMeslek option', options => 
      options.map(opt => ({ value: opt.value, text: opt.textContent.trim() })).filter(opt => opt.value !== '-1')
    );
    
    if (professions.length > 0) {
      const profession = professions[0];
      console.log(`Selecting profession: ${profession.text}`);
      
      await Promise.all([
        page.waitForResponse(response => response.url().includes('almanya') && response.request().method() === 'POST'),
        page.$eval('#ContentPlaceHolder1_ddlMeslek', (el, val) => {
          el.value = val;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, profession.value)
      ]);
      await page.waitForTimeout(1000);

      const contentHtml = await page.evaluate(() => {
         return document.querySelector('.vizedetay') ? document.querySelector('.vizedetay').innerHTML : 'Not found';
      });
      fs.writeFileSync('almanya_result.html', contentHtml);
      console.log(`Saved populated HTML to almanya_result.html. Length: ${contentHtml.length}`);
    }
  }
  
  await browser.close();
})();
