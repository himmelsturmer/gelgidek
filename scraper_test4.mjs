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
    
    // Select purpose and wait for POST response
    console.log(`Selecting purpose: ${purpose.text}`);
    await Promise.all([
      page.waitForResponse(response => response.url().includes('almanya') && response.request().method() === 'POST'),
      page.evaluate((val) => {
        document.getElementById('ContentPlaceHolder1_ddlGidisAmaci').value = val;
        __doPostBack('ctl00$ContentPlaceHolder1$ddlGidisAmaci','');
      }, purpose.value)
    ]);
    await page.waitForTimeout(500); // DOM settling buffer

    const professions = await page.$$eval('#ContentPlaceHolder1_ddlMeslek option', options => 
      options.map(opt => ({ value: opt.value, text: opt.textContent.trim() })).filter(opt => opt.value !== '-1')
    );
    
    if (professions.length > 0) {
      const profession = professions[0];
      console.log(`Selecting profession: ${profession.text}`);
      
      await Promise.all([
        page.waitForResponse(response => response.url().includes('almanya') && response.request().method() === 'POST'),
        page.evaluate((val) => {
          document.getElementById('ContentPlaceHolder1_ddlMeslek').value = val;
          __doPostBack('ctl00$ContentPlaceHolder1$ddlMeslek','');
        }, profession.value)
      ]);
      await page.waitForTimeout(500);

      const contentHtml = await page.evaluate(() => {
         return document.querySelector('.vizedetay') ? document.querySelector('.vizedetay').innerHTML : 'Not found';
      });
      fs.writeFileSync('almanya_result.html', contentHtml);
      console.log(`Saved populated HTML to almanya_result.html. Length: ${contentHtml.length}`);
    }
  }
  
  await browser.close();
})();
