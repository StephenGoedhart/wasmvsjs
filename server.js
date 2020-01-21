var file = require('fs');
var express = require('express');
var app = new express();

app.get('/', function(req,res){
    res.sendFile('index.html');
})

app.listen(2900)