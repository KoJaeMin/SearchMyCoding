const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('../db/main.db',(err)=>{
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
});
//db.run('CREATE TABLE category(id integer primary key autoincrement, name text not null unique, data text)');

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
        db.run(`INSERT INTO category(name,data) VALUES('${ulList[index].title}','${ulList[index].content}')`,()=>{
            console.log('suc');
        });
        console.log(ulList[index]);
    });
    browser.close();
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
})();




