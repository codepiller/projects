var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var path = require('path');
var app = express();

// models
var User = require('./models/user'),
	Location = require('./models/location');

mongoose.connect('mongodb://localhost/location');

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', false);
	next();
});
	

app.use(fileUpload());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'photos')));

// routes
var apiRoute = require('./routes/api');

app.use('/api',apiRoute);


app.get('/', function(req, res){
	res.send('use api route');
});

app.get('/photo/:photo', function(req, res){
	res.sendFile(__dirname+'/photos/'+ req.params.photo);
});



app.listen(4000, function() {
	console.log('Listing on port 4000');
});