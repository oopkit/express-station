'use strict';

var Corp = require('wechat-enterprise-api');
var conf = require('../../config/conf.json').corp;

module.exports = function(app){
	var corp = new Corp(conf.corpid, conf.secret, conf.appid);
	app.get('/api/wechat/ticket', function(req, res){
		res.send({
			error_code: 0,
			data: {
				appid: conf.corpid,
				proxy: conf.proxy
			}
		})
	})
}