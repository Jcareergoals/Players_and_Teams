var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express(); 

app.use(express.static(path.join('./clients/'))); 
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.listen(1337, function(){
	console.log("Listening at port: 1337");
});