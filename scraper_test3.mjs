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
    console.log(`Selecting Purpose: ${purpose.text}`);
    
    // Select purpose, which triggers AJAX UpdatePanel postback
    await page.selectOption('#ContentPlaceHolder1_ddlGidisAmaci', purpose.value);
    
    // Wait until professions dropdown is populated
    await page.waitForFunction(() => {
        const select = document.querySelector('#ContentPlaceHolder1_ddlMeslek');
        return select && select.options.length > 1;
    });
    
    const professions = await page.$$eval('#ContentPlaceHolder1_ddlMeslek option', options => 
      options.map(opt => ({ value: opt.value, text: opt.textContent.trim() })).filter(opt => opt.value !== '-1')
    );
    console.log('Professions after purpose select:', professions.length);
    
    if (professions.length > 0) {
      const profession = professions[0];
      console.log(`Selecting Profession: ${profession.text}`);
      
      await page.selectOption('#ContentPlaceHolder1_ddlMeslek', profession.value);
      
      // Wait for .vizedetay to not be empty
      console.log('Waiting for .vizedetay to populate...');
      await page.waitForFunction(() => {
         const div = document.querySelector('.vizedetay');
         return div && div.innerHTML.trim().length > 100;
      });
      
      const contentHtml = await page.evaluate(() => {
         return document.querySelector('.vizedetay').innerHTML;
      });
      fs.writeFileSync('almanya_result.html', contentHtml);
      console.log('Saved populated HTML to almanya_result.html');
    }
  }
  
  await browser.close();
})();
