'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var params = require('express-params');
var favicon = require('serve-favicon');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var conf = require('./config/conf.json');
var app = express();
var routes = require('./routes');

app.set('port', process.env.PORT || conf.host.port);
app.set('view engine', 'html');
app.engine('html', ejs.__express);
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect('mongodb://192.168.1.2/test');
app.use(require('express-session')({
	secret: 'claypot',
	store: new MongoStore({
		mongooseConection: mongoose.connection,
		db: 'test'
	})
}));

params.extend(app);
routes(app);
// 路由不到地址自动切换到statics目录查找静态文件, 暂不考虑其他问题
app.use('/', express.static(__dirname + '/statics'));

app.listen(app.get('port'), function(){
	console.log('listen to ' + app.get('port'));
});