async function run() {
  const response = await fetch("https://www.vizedunyasi.com/vizebilgisi/almanya");
  const html = await response.text();

  const selectRegex = /<select[^>]*name="([^"]*)"[^>]*>([\s\S]*?)<\/select>/g;
  let match;
  while ((match = selectRegex.exec(html)) !== null) {
    console.log(`Select Name: ${match[1]}`);
    const optionsRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g;
    let optMatch;
    while ((optMatch = optionsRegex.exec(match[2])) !== null) {
      console.log(`  Option: ${optMatch[2].trim()} (value: ${optMatch[1]})`);
    }
  }
}
run();
