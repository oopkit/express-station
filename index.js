'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var params = require('express-params');

var conf = require('./config/conf.json');
var app = express();
var routes = require('./routes');
var socket = require('./routes/socket');

app.set('port', process.env.PORT || conf.host.port);
app.set('view engine', 'html');
app.engine('html', ejs.__express);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 扩展req.params
params.extend(app);
// 页面路由
routes(app);
// 静态路径
app.use('/common', express.static(__dirname + '/views/common'));
var server = app.listen(app.get('port'));
socket(server);

console.log("listen to " + app.get('port'));