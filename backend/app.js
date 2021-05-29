var express = require('express')
var app = express()
//var http =require('http')
var path = require('path')
var fs = require('fs')
//var bodyParser = require('body-parser');
var qs = require('querystring');

const port = 8000
//node app.set("port",port)

app.get('/',(req,res) =>{res.sendFile(__dirname+'/home/home.html')});//insert main html file
app.get('/MBTI/index.html',(req,res)=>{res.sendFile(__dirname+'/MBTI/index.html');});
app.post('/', (req, res)=>{res.send('Got a POST request');});
app.put('/',(req,res)=>{res.send('Got a PUT request')});
app.delete('/',(req,res)=>{res.send('Got a DELETE request')});

app.listen(port,()=>{console.log(`Exaple app listening at http://localhost:${port}`)})
