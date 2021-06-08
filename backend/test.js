const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
//const { find } = require("cheerio/lib/api/traversing");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db/main.db',(err)=>{
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
});

//inflean_lecture 테이블 만드는 코드 시작 : 이미 실행을 하였기 때문에 할 필요가 없다
//db.run('CREATE TABLE inflean_lecture(id integer primary key autoincrement, title text not null unique, link text, link_img text, pice text, rating text)');
//inflean_lecture 테이블 만드는 코드 끝 : 이미 실행을 하였기 때문에 할 필요가 없다

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    ///인프런 크롤링 시작
    const page = await browser.newPage();
    await page.goto("https://www.inflearn.com/courses?charge=free&order=seq");
    
    var content = await page.content();
    var $ = cheerio.load(content);
    var ulList = [];
    var lists = $(".column > div");
    lists.each(function(index, list) {
        if($(this).find('.star_solid').attr('style')!=undefined){
            ulList[index] = {
                title: $(this).find('.course_card_front > .card-content').children('.course_title').text(),
                link:'https://www.inflearn.com'+$(this).find('.course_card_front').attr('href'),
                link_img:$(this).find('.swiper-lazy').attr('src'),
                price:'무료',
                rating:$(this).find('.star_solid').attr('style').replace("width: ",""),
            };
            db.run(`INSERT INTO inflean_lecture(title,link,link_img,pice,rating) VALUES('${ulList[index].title}','${ulList[index].link}','${ulList[index].link_img}','${ulList[index].price}','${ulList[index].rating}')`,()=>{
                console.log('suc');
            });
            console.log(ulList[index]);
        }
        
    });


    await page.goto("https://www.inflearn.com/courses?charge=paid&order=seq");
    content = await page.content();
    $ = cheerio.load(content);
    ulList = []
    lists = $(".column > div");
    lists.each(function(index, list) {
        if($(this).find('.star_solid').attr('style')!=undefined){
            if($(this).find('.price').children('.pay_price').text()!==''){
                ulList[index] = {
                    title: $(this).find('.course_card_front > .card-content').children('.course_title').text(),
                    link:'https://www.inflearn.com'+$(this).find('.course_card_front').attr('href'),
                    link_img:$(this).find('.swiper-lazy').attr('src'),
                    price:$(this).find('.price').children('.pay_price').text(),
                    rating:$(this).find('.star_solid').attr('style').replace("width: ",""),
                };
            }else{
                ulList[index] = {
                    title: $(this).find('.course_card_front > .card-content').children('.course_title').text(),
                    link:'https://www.inflearn.com'+$(this).find('.course_card_front').attr('href'),
                    link_img:$(this).find('.swiper-lazy').attr('src'),
                    price:$(this).find('.price').text(),
                    rating:$(this).find('.star_solid').attr('style').replace("width: ",""),
                };
            }
            
            db.run(`INSERT INTO inflean_lecture(title,link,link_img,pice,rating) VALUES('${ulList[index].title}','${ulList[index].link}','${ulList[index].link_img}','${ulList[index].price}','${ulList[index].rating}')`,()=>{
                console.log('suc');
            });
            console.log(ulList[index]);
        }
        
    });

    browser.close();

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
})();