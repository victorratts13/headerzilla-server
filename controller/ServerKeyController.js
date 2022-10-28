const chromium = require('chrome-aws-lambda');
const chrome = require('chromium');
const puppeteer = require('puppeteer');
const extra = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { Read, Write } = require('./CacheFile');
const stealth = StealthPlugin();
extra.use(stealth);

function SetHeaderKey(url, expected) {
    return new Promise(async (resolve, reject) => {
        var cache = await Read(__dirname + '/../cache/header.json');
        var ch = JSON.parse(cache);
        var now = parseInt(Date.now() /  1000)
        console.log(now)
        if (ch[expected] && ch.expire > now) {
            resolve(ch)
        } else {
            var ExecPath = chrome.path;
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
                    headers.expire = (now + (60 * 30))
                    var CreateCache = await Write(__dirname + '/../cache/header.json', JSON.stringify(headers));
                    console.log(CreateCache)
                    resolve(headers)
                }
            })

            await page.goto(url, {
                waitUntil: 'load',
                timeout: 0
            });


            await browser.close();
        }
    })
}

module.exports = { SetHeaderKey }