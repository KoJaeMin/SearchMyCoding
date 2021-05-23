var express = require('express')
var app = express()
const port = 8000

app.get('/',(req,res) =>{res.sendFile(__dirname+'/home/home.html')});//insert main html file
app.get('/MBTI/index.html',(req,res)=>{res.sendFile(__dirname+'/MBTI/index.html');});
app.post('/', (req, res)=>{res.send('Got a POST request');});
app.put('/',(req,res)=>{res.send('Got a PUT request')});
app.delete('/',(req,res)=>{res.send('Got a DELETE request')});

app.listen(port,()=>{console.log(`Exaple app listening at http://localhost:${port}`)})
