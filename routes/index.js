'use strict';

var api = require('./api');
var page = require('./page');

module.exports = function(app){
	api(app);
	page(app);

	app.get('/test', function(req, res){
		res.send('you name is ' + req.query.name);
	});
}