const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db/main.db',(err)=>{
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
});

//////db생성 시작 : db생성은 한 번만

//db.run('CREATE TABLE inflean_category(id integer primary key autoincrement, name text not null unique, type text, content text)');
//db.run('CREATE TABLE opentutorials_category(id integer primary key autoincrement, name text not null unique, link text not null)');

//////db생성 끝

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    ///인프런 크롤링 시작
    const page = await browser.newPage();
    await page.goto("https://www.inflearn.com/courses");
    await page.evaluate(()=>{
        document.getElementsByClassName("tag more button")[0].click();
    })
    
    var content = await page.content();
    var $ = cheerio.load(content);
    var ulList = [];
    var types;
    var datas;
    var lists = $(".skill_buttons > button");
    lists.each(function(index, list) {
        if($(this).attr('fxd-data')!=undefined){
            types=JSON.parse($(this).attr('fxd-data')).type;
            datas=JSON.parse($(this).attr('fxd-data')).slug;
            ulList[index] = {
                title: $(this).attr('name'),
                type: types,
                content: datas,
            };
            db.run(`INSERT INTO inflean_category(name,type,content) VALUES('${ulList[index].title}','${ulList[index].type}','${ulList[index].content}')`,()=>{
                console.log('suc');
            });
            console.log(ulList[index]);
        }
    });
    ///인프런 크롤링 끝

    
    ///생활코딩 크롤링 시작
    const page1 = await browser.newPage();
    await page1.goto("https://opentutorials.org/course/1");
    var content = await page1.content();
    var $ = cheerio.load(content);
    var ulList1 = [];
    var lists = $("li > .label");
    lists.each(function(index, list) {
        ulList1[index] = {
            title: $(this).find('.courselink').text(),
            link: $(this).find('.courselink').attr('href'),
        };
        db.run(`INSERT INTO opentutorials_category(name,link) VALUES('${ulList1[index].title}','${ulList1[index].link}')`,()=>{
            console.log('suc');
        });
        console.log(ulList1[index]);
    });
    browser.close();
    ///생활코딩 크롤링 끝

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
})();
