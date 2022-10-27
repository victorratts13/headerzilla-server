const chromium = require('chrome-aws-lambda');
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra');

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function handler(event, context) {
  let result = null;
  let browser = null;

  try {

    let args = chromium.args;
    let viewport = chromium.defaultViewport;
    let exec_path = await chromium.executablePath;
    let headless = chromium.headless;

    // we are running locally
    if (process.env.AWS_EXECUTION_ENV === undefined) {
      exec_path = process.env.LOCAL_CHROMIUM;
    }

    console.log(exec_path)
    browser = await puppeteer.launch({
      args: args,
      defaultViewport: viewport,
      executablePath: exec_path,
      headless: headless,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600 });

    console.log(`Testing the stealth plugin..`);
    await page.goto('https://bot.sannysoft.com');
    await page.waitFor(5000);
    await page.screenshot({ path: 'stealth.png', fullPage: true });

    console.log(`All done, check the screenshots. ✨`);

  } catch (error) {
    console.error(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}

module.exports = handler;
