import { chromium } from 'playwright';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Germany visa page...');
  await page.goto('https://www.vizedunyasi.com/vizebilgisi/almanya', { waitUntil: 'networkidle' });
  
  console.log('Extracting options...');
  const purposes = await page.$$eval('#ContentPlaceHolder1_ddlGidisAmaci option', options => 
    options.map(opt => ({ value: opt.value, text: opt.textContent.trim() })).filter(opt => opt.value !== '-1')
  );
  
  const professions = await page.$$eval('#ContentPlaceHolder1_ddlMeslek option', options => 
    options.map(opt => ({ value: opt.value, text: opt.textContent.trim() })).filter(opt => opt.value !== '-1')
  );
  
  console.log('Purposes:', purposes);
  console.log('Professions:', professions);

  if (purposes.length > 0 && professions.length > 0) {
    const purpose = purposes[0];
    const profession = professions[0];
    console.log(`Selecting Purpose: ${purpose.text} and Profession: ${profession.text}`);
    
    // Select purpose, which might trigger a postback. 
    // Wait for the resulting navigation or network idle.
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.selectOption('#ContentPlaceHolder1_ddlGidisAmaci', purpose.value)
    ]);
    
    // Select profession, which triggers another postback.
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.selectOption('#ContentPlaceHolder1_ddlMeslek', profession.value)
    ]);
    
    console.log('Selections successful. Extracting text from body...');
    // Log the text content to see where the data is
    const innerText = await page.evaluate(() => document.body.innerText);
    console.log('Data preview (first 500 chars):', innerText.substring(0, 500));
  }
  
  await browser.close();
})();
