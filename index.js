'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var params = require('express-params');
var favicon = require('serve-favicon');

var conf = require('./config/conf.json');
var app = express();
var routes = require('./routes');
var socket = require('./routes/socket');

app.set('port', process.env.PORT || conf.host.port);
app.set('view engine', 'html');
app.engine('html', ejs.__express);
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 扩展req.params
params.extend(app);
// 页面路由
routes(app);
// 路由不到地址自动切换到statics目录查找静态文件, 暂不考虑其他问题
app.use('/', express.static(__dirname + '/statics'));
var server = app.listen(app.get('port'));
socket(server);

app.listen(app.get('port'), function(){
	console.log('listen to ' + app.get('port'));
});