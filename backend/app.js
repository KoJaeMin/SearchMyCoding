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
app.get('/MBTI/result/:resultId',(req,res)=>{
    switch(req.params.resultId){
        case '0':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-0.html'));
            break;
        case '1':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-1.html'));
            break;
        case '2':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-2.html'));
            break;
        case '3':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-3.html'));
            break;
        case '4':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-4.html'));
            break;
        case '5':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-5.html'));
            break;
        case '6':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-6.html'));
            break;
        case '7':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-7.html'));
            break;
        case '8':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-8.html'));
            break;
        case '9':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-9.html'));
            break;
        case '10':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-10.html'));
            break;
        case '11':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-11.html'));
            break;
        case '12':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-12.html'));
            break;
        case '13':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-13.html'));
            break;
        case '14':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-14.html'));
            break;
        case '15':
            res.sendFile(path.join(__dirname,'/../fronted/page/mbti/result-15.html'));
            break;
        default:
            alert('error')
            res.sendFile(path.join(__dirname,'/../fronted/page/home.html'))
            break;
    }
});
app.get('/MBTI/image/:imageId',(req,res)=>{
    switch(req.params.imageId){
        case '0':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-0.jpg'));
            break;
        case '1':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-1.jpg'));
            break;
        case '2':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-2.jpg'));
            break;
        case '3':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-3.jpg'));
            break;
        case '4':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-4.jpg'));
            break;
        case '5':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-5.jpg'));
            break;
        case '6':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-6.jpg'));
            break;
        case '7':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-7.jpg'));
            break;
        case '8':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-8.jpg'));
            break;
        case '9':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-9.jpg'));
            break;
        case '10':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-10.jpg'));
            break;
        case '11':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-11.jpg'));
            break;
        case '12':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-12.jpg'));
            break;
        case '13':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-13.jpg'));
            break;
        case '14':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-14.jpg'));
            break;
        case '15':
            res.send(path.join(__dirname,'/../fronted/image/mbti/image-15.jpg'));
            break;
        default:
            res.send(path.join(__dirname,'/../fronted/image/searchmycoding.jpg'))
            break;
    }
});
app.post('/', (req, res)=>{res.send('Got a POST request');});
app.put('/',(req,res)=>{res.send('Got a PUT request')});
app.delete('/',(req,res)=>{res.send('Got a DELETE request')});
app.use((req,res,next)=>{
    console.log('Request Type',req.method,req.path);
    next();
});

let server =app.listen(port,()=>{console.log(`Exaple app listening at http://localhost:${port}`)})
