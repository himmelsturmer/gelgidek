import { chromium } from 'playwright';

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
    
    // Select purpose, which triggers postback
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.selectOption('#ContentPlaceHolder1_ddlGidisAmaci', purpose.value)
    ]);
    
    const professions = await page.$$eval('#ContentPlaceHolder1_ddlMeslek option', options => 
      options.map(opt => ({ value: opt.value, text: opt.textContent.trim() })).filter(opt => opt.value !== '-1')
    );
    console.log('Professions after purpose select:', professions);
    
    if (professions.length > 0) {
      const profession = professions[0];
      console.log(`Selecting Profession: ${profession.text}`);
      
      // Select profession, which triggers postback to show data
      await Promise.all([
        page.waitForLoadState('networkidle'),
        page.selectOption('#ContentPlaceHolder1_ddlMeslek', profession.value)
      ]);
      
      // Dump the HTML segment where the results usually appear (e.g. inside a container)
      // I'll look for standard container divs, or just grab the elements with evrak form
      const contentHtml = await page.evaluate(() => {
         // This site uses a specific div for content. Let's find it.
         return document.querySelector('.evrak-liste') ? document.querySelector('.evrak-liste').outerHTML : document.body.innerHTML; 
      });
      import('fs').then(fs => fs.writeFileSync('almanya_result.html', contentHtml));
      console.log('Saved result HTML to almanya_result.html');
    }
  }
  
  await browser.close();
})();
