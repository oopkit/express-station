'use strict';
var fs = require('fs');

module.exports = function(app){
	app.use(function(req, res, next){
		res._render = res.render;
		res.render = function(path, params){
			fs.readFile(params.body, 'utf-8', function(err, data){
				var body = params.body.match(/[^/]*\.html$/);
				body = !!body ? body[0] : params.body;
				params.body = !!err ? body + ' not found' : data;
				res._render(path, params);
			});
		}
		next();
	});
	var root = process.cwd() || process.env.PWD || process.env.INIT_CWD;
	app.get('/', function(req, res){
		res.render('index', {
			body: root + '/views/page/index.html'
		});
	});

	app.get('/:page.html', function(req, res){
		res.render('index', {
			body: root + '/views/page/' + req.params.page + '.html'
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