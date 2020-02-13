var file = require('fs');
var express = require('express');
var app = new express();

app.use(express.static(__dirname));
app.get('/', function(req,res){
    res.sendFile('index.html');
})

app.listen(2900)
console.log("app started at: 2900")