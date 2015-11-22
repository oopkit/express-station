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

	app.get('/api/wechat/user', function(req, res){
		corp.getUserIdByCode(req.query.code, function(err, data){
			console.log( err, data );
			var uid = '';
			if( !!err ){
				res.send({
					code: 1008,
					error_message: err
				})
				return false;
			} else {
				uid = data;
				corp.getUser(data.UserId, function(err, data){
					if( !!err ){
						res.send({
							code: 1008,
							error_message: err
						})
						return false;
					}
					data.code = req.query.code;
					data.UserId = uid.UserId;
					data.DeviceId = uid.DeviceId;
					res.send({
						error_code: 0,
						data: data
					});
				});
			}
			
		});
		
		
	})
}