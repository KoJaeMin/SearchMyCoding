var express = require('express')
var app = express()
var path = require('path')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db/main.db',(err)=>{
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
});


const port = 80

const inflearn_lecture = 'SELECT link,link_img as image,title,pice as price ,rating from inflean_lecture;';
const opentutorial = 'SELECT name as title, link from opentutorials_category;';
const free_inflearn_lecture = "SELECT link,link_img as image,title,pice as price ,rating from inflean_lecture where pice='무료';";
app.get('/inflean_data',(req,res)=>{
    db.all(inflearn_lecture,[],(err,datas)=>{
        if (err) {
            throw err;
        }
        res.send(datas)
    });
});
app.get('/opentutorials',(req,res)=>{
    db.all(opentutorial,[],(err,data)=>{
        if(err){
            throw err;
        }
        res.send(data);
    });
});
app.get('/free_inflearn_lecture',(req,res)=>{
    db.all(free_inflearn_lecture,[],(err,data)=>{
        if(err){
            throw err;
        }
        res.send(data);
    });
});

/*db.each(inflearn_lecture,(err,data)=>{
    if (err) {
        throw err;
    }else{
        console.log(data.price)
    }
})*/
app.use(express.static(path.join(__dirname,'../fronted')));

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'/../fronted/home.html'))
});//insert main html file
app.get('/MBTI',(req,res)=>{res.sendFile(path.join(__dirname,'/../fronted/page/MBTI.html'));});
app.get('/FreeCourse',(req,res)=>{res.sendFile(path.join(__dirname,'/../fronted/page/FreeCourse.html'))});
app.get('/AllCourse',(req,res)=>{res.sendFile(path.join(__dirname,'/../fronted/page/AllCourse.html'))});
app.get('/Q&A',(req,res)=>{res.sendFile(path.join(__dirname,'/../fronted/page/Q&A.html'))})

app.post('/', (req, res)=>{res.send('Got a POST request');});
app.put('/',(req,res)=>{res.send('Got a PUT request')});
app.delete('/',(req,res)=>{res.send('Got a DELETE request')});
app.use((req,res,next)=>{
    console.log('Request Type',req.method,req.path);
    next();
});

let server =app.listen(port,()=>{console.log(`Exaple app listening at http://localhost:${port}`)})
