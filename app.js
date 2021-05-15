const express = require('express')
const app = express()
const port = 8000

app.get('/',(req,res) =>{res.sendFile(__dirname+'/public/')});//insert main html file
app.post('/', (req, res)=>{res.send('Got a POST request');});
app.put('/',(req,res)=>{res.send('Got a PUT request')});
app.delete('/',(req,res)=>{res.send('Got a DELETE request')});

app.listen(port,()=>{console.log(`Exaple app listening at http://localhost:${port}`)})

