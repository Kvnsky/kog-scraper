const writeFileSync = require('fs').writeFileSync;
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://kog.tw/#p=maps', {
    waitUntil: 'networkidle2',
  });

  let maps = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.col')).map((map) => [
      map.querySelector('.my-0, .font-weight-normal').innerText,
      map.querySelector('.list-group-item:nth-child(2)').innerText,
      map.querySelector('.list-group-item:nth-child(3)').innerText,
    ])
  );

  maps = maps.map((mapArray) => {
    return {
      map: mapArray[0],
      difficulty: mapArray[1],
      points: parseInt(mapArray[2].split(' ')[0]),
    };
  });

  maps.sort((a, b) => a.points - b.points);

  writeToJson(maps);
  await browser.close();
})();

const writeToJson = (maps) => {
  writeFileSync('./maps.json', JSON.stringify(maps));
};
