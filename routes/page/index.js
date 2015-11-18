'use strict';

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', {
			layoutUrl: res.layout,
			layoutUrls: res.layouts,
			test: 'testtset'
		});
	});

	app.get('/socket', function(req, res){
		res.render('socket', {
		});
	});
}