const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer');
const extra = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const stealth = StealthPlugin();
extra.use(stealth);

function SetHeaderKey(url, expected) {
    return new Promise(async (resolve, reject) => {
        var ExecPath = puppeteer.executablePath();
        console.log(await chromium.executablePath ?? ExecPath)
        const browser = await extra.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath ?? ExecPath,
            headless: true,
        });

        const page = await browser.newPage();
        page.on("response", async (response) => {
            var headers = response.request().headers();
            if (headers[expected]) {
                resolve(headers)
            }
        })

        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        });


        await browser.close();
    })
}

module.exports = { SetHeaderKey }