var express = require('express')
var app = express()
var path = require('path')
var cookieParser = require('cookie-parser');


const port = 8000
//var qs = require('querystring');
//var fs = require('fs')
//var bodyParser = require('body-parser');
//var methodOverride = require('method-override');
//const base_dir='../home'


//node app.set("port",port)
////오류처리
//app.use(bodyParser());
//app.use(methodOverride());
//app.use(logErrors);
//app.use(clientErrorHandler);
//app.use(errorHandler);
////


app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'/../home/home.html'))
});//insert main html file
app.get('/MBTI',(req,res)=>{res.sendFile(path.join(__dirname,'/../MBTI/index.html'));});
app.get('/MBTI/result/:resultId',(req,res)=>{
    switch(req.params.resultId){
        case '0':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-0.html'));
            break;
        case '1':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-1.html'));
            break;
        case '2':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-2.html'));
            break;
        case '3':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-3.html'));
            break;
        case '4':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-4.html'));
            break;
        case '5':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-5.html'));
            break;
        case '6':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-6.html'));
            break;
        case '7':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-7.html'));
            break;
        case '8':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-8.html'));
            break;
        case '9':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-9.html'));
            break;
        case '10':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-10.html'));
            break;
        case '11':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-11.html'));
            break;
        case '12':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-12.html'));
            break;
        case '13':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-13.html'));
            break;
        case '14':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-14.html'));
            break;
        case '15':
            res.sendFile(path.join(__dirname,'/../MBTI/page/result-15.html'));
            break;
        default:
            alert('error')
            res.sendFile(path.join(__dirname,'/../MBTI/index.html'))
            break;
    }
});
app.post('/', (req, res)=>{res.send('Got a POST request');});
app.put('/',(req,res)=>{res.send('Got a PUT request')});
app.delete('/',(req,res)=>{res.send('Got a DELETE request')});
app.use((req,res,next)=>{
    console.log('Request Type',req.method);
    next();
});

let server =app.listen(port,()=>{console.log(`Exaple app listening at http://localhost:${port}`)})
server.close()