import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.vizedunyasi.com/vizebilgisi/almanya', { waitUntil: 'load' });
  
  const purposes = await page.$$eval('#ContentPlaceHolder1_ddlGidisAmaci option', opts => opts.map(o => o.value).filter(v => v !== '-1'));
  if (purposes.length > 0) {
      console.log('Selecting purpose:', purposes[0]);
      await Promise.all([
          page.waitForResponse(response => response.url().includes('almanya') && response.request().method() === 'POST'),
          page.selectOption('#ContentPlaceHolder1_ddlGidisAmaci', purposes[0])
      ]);
      await page.waitForTimeout(1000);
      
      const professions = await page.$$eval('#ContentPlaceHolder1_ddlMeslek option', opts => opts.map(o => o.value).filter(v => v !== '-1'));
      if (professions.length > 0) {
          console.log('Selecting profession:', professions[0]);
          await Promise.all([
              page.waitForResponse(response => response.url().includes('almanya') && response.request().method() === 'POST'),
              page.selectOption('#ContentPlaceHolder1_ddlMeslek', professions[0])
          ]);
          await page.waitForTimeout(3000);
          
          const html = await page.evaluate(() => document.body.innerHTML);
          fs.writeFileSync('almanya_full.html', html);
          console.log('Saved full html');
      }
  }
  
  await browser.close();
})();
