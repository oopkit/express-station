'use strict';

var Corp = require('wechat-enterprise-api');
var conf = require('../../config/conf.json').corp;

module.exports = function(app){
	var corp = new Corp(conf.corpid, conf.secret, conf.appid);
}