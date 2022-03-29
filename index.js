const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://kog.tw/#p=maps', {
    waitUntil: 'networkidle2',
  });
  await page.screenshot({ path: 'test.png' });

  const mapNames = await page.evaluate(() => {
    const mapNames = [];
    const mapNameElements = document.querySelectorAll(
      '.my-0, .font-weight-normal'
    );
    for (let i = 0; i < mapNameElements.length; i++) {
      mapNames.push(mapNameElements[i].innerText);
    }

    return mapNames;
  });

  const mapPoints = await page.evaluate(() => {
    const mapPoints = [];
    const mapPointElements = document.querySelectorAll(
      '.list-group-item:nth-child(3)'
    );
    for (let i = 0; i < mapPointElements.length; i++) {
      mapPoints.push(mapPointElements[i].innerText);
    }

    return mapPoints;
  });

  const mapDifficulties = await page.evaluate(() => {
    const mapDifficulties = [];
    const mapDifficultyElements = document.querySelectorAll(
      '.list-group-item:nth-child(2)'
    );
    for (let i = 0; i < mapDifficultyElements.length; i++) {
      mapDifficulties.push(mapDifficultyElements[i].innerText);
    }

    return mapDifficulties;
  });

  fs.writeFileSync('mapNames.json', JSON.stringify(mapNames));
  fs.writeFileSync('mapPoints.json', JSON.stringify(mapPoints));
  fs.writeFileSync('mapDifficulties.json', JSON.stringify(mapDifficulties));

  await browser.close();
})();
