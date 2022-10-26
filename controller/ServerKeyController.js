const puppeteer = require('puppeteer');
const extra = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const stealth = StealthPlugin();
extra.use(stealth);

function SetHeaderKey(url, expected) {
    return new Promise(async (resolve, reject) => {
        var ExecPath = puppeteer.executablePath();
        console.log(ExecPath)
        const browser = await extra.launch({
            headless: true,
            executablePath: ExecPath,
            'args': [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
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

// var url = 'https://www.ifood.com.br/delivery/fortaleza-ce/mais-acai-mania-parque-dois-irmaos/7a0f1bd4-5673-460f-8269-c0bbed381547';
// var url = 'https://google.com/';
// (async () => {
//     var ExecPath = puppeteer.executablePath();
//     const browser = await extra.launch({ headless: false, executablePath: ExecPath });
//     const page = await browser.newPage();

//     page.on("response", async (response) => {
//         console.log(response.url())
//         // console.log(response.request().headers())
//     })  

//     await page.goto(url, {
//         waitUntil: 'load',
//         timeout: 0
//     });

// })();

module.exports = { SetHeaderKey }