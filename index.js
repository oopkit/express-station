'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var params = require('express-params');

var conf = require('./config/conf.json');
var app = express();
var routes = require('./routes');

app.set('port', process.env.PORT || conf.host.port);
app.set('view engine', 'html');
app.engine('html', ejs.__express);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

params.extend(app);
routes(app);
app.use('/common', express.static(__dirname + '/views/common'));


app.listen(app.get('port'), function(){
	console.log('listen to ' + app.get('port'));
});