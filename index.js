const writeFileSync = require('fs').writeFileSync;
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://kog.tw/#p=maps', {
    waitUntil: 'networkidle2',
  });

  const maps = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.col')).map((map) => [
      map.querySelector('.my-0, .font-weight-normal').innerText,
      map.querySelector('.list-group-item:nth-child(2)').innerText,
      map.querySelector('.list-group-item:nth-child(3)').innerText,
    ])
  );
  writeToJson(maps);
  await browser.close();
})();

const writeToJson = (maps) => {
  writeFileSync('./maps.json', JSON.stringify(maps));
};
