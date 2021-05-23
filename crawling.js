const puppeteer = require("puppeteer");
const cheerio = require('cheerio');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    /*
    page.setViewport({
        width: 1200,
        height: 700,
    });
    */
    await page.goto("https://www.inflearn.com/courses");
    await page.evaluate(()=>{
        document.getElementsByClassName("tag more button")[0].click();
    })
    //page.waitForSelector("button.tag more button")
    //await page.click("button");
    //}
    
    const content = await page.content();
    const $ = cheerio.load(content);
    let ulList = [];
    const lists = $(".skill_buttons > button");
    lists.each(function(index, list) {
        ulList[index] = {
            title: $(this).attr('name'),
            content:$(this).attr('fxd-data'),
        };
        console.log(ulList[index]);
    });
    browser.close();
    
})();  