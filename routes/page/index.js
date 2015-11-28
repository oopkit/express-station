'use strict';
var fs = require('fs');

module.exports = function(app){
	// 应用程序根目录
	var root = process.cwd() || process.env.PWD || process.env.INIT_CWD;
	// 模板引擎预处理，重写 response.render 事件
	app.use(function(req, res, next){
		res._render = res.render;
		/*
		 * @path   模板文件名，不需要带后缀名
		 * @params 原render事件的可配置参数，其中body属性为地址对应完整路径
		 */
		res.render = function(path, params){
			// 避免多次使用io，也不永驻内存，暂时移除
			// if( !fs.existsSync(root + '/views/' + path + '.html') ){
			// 	console.error('Not Found Page, Error Code: 1001, Path: ' + root + '/views/' + path + '.html');
			// 	return res.status(404).send('Not Found Page, Error Code: 1001');
			// }
			if( !params || !params.body ){
				console.error('Not Found Page, Error Code: 1002, Params: attr.body not found');
				return res.status(404).send('Not Found Page, Error Code: 1002');
			}
			fs.readFile(params.body, 'utf-8', function(err, data){
				var body = params.body.match(/[^/]*\.html$/);
				body = !!body ? body[0] : params.body;
				params.body = !!err ? body + ' not found' : data;
				try{
					res._render(path, params);
				} catch(err){
					res.send('page not found');
				}
				params.title = params.title || '';
				res._render(path, params);
			});
		}
		next();
	});

	app.get('/', function(req, res){
		res.render('index', {
			body: root + '/views/page/index.html'
		});
	});

	app.get('/:page', function(req, res){
		res.render('index', {
			body: root + '/views/page/' + req.params.page + '.html',
			title: '首页'
		});
	});

	app.get('/single/:page.html', function(req, res){
		res.render('single', {
			body: root + '/views/page/' + req.params.page + '.html'
		});
	});

	app.get('/wechat', function(req, res){
		res.render('page/wechat/wechat', {
			body: root + '/views/page/wechat/wechat.html'
		});
	});

	app.get('/wechat/user', function(req, res){
		res.render('page/wechat/wechat_user', {
			body: root + '/views/page/wechat/wechat_user.html'
		});
	});

	app.get('/socket', function(req, res){
		res.render('socket', {
		});
	});

	app.get('/multiplexing', function(req, res){
		res.render('multiplexing', {
		});
	});

	app.get('/multiplexing/statistics', function(req, res){
		res.render('multiplexing_statistics', {
		});
	});
}