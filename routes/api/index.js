'use strict';
var shorturl = require('./short_url');
module.exports = function(app){
	shorturl(app);
	app.get('/api/user', function(req, res){
		res.send({
			status: 0,
			method: 'get',
			params: req.query
		});
	});

	app.post('/api/user', function(req, res){
		res.send({
			status: 0,
			method: 'post',
			params: req.query
		});
	});

	app.get('/api/cross', function(req, res){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,POST');
		res.header('Access-Control-Allow-Credentials', true);
		res.send({
			status: 0,
			method: 'get',
			params: req.query
		});
	});

	app.param('uid', /^[0-9]+$/);
	app.get('/user/:uid', function(req, res){
		res.send('<h1>welcome to this world, uid: ' + req.params.uid + '</h1>')
	});
}