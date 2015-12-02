'use strict';
var Hashids = require('hashids');
var hashids = new Hashids('this is short url');

module.exports = function(app){
	var urls = {};
	/*
	 * @长链接地址转成短链接地址
	 * 短链接编码使用hashids，存放时长1天
	 */ 
	app.get("/short/url", function(req, res){
	    var u = req.query.url;
	    var stamp = new Date().getTime();
	    var code = hashids.encode(stamp);
	    for( var i in urls ){
	    	if( parseInt( hashids.decode(i) ,10) + 86400 > stamp ){
	    		delete urls[i];
	    	}
	    }
	    if( !!u ){
	        urls[ code ] = u;
	        res.send({
	            code: 0,
	            data: "/short/url/"+code
	        });
	    } else {
	        res.send({
	            code: 1000,
	            data: "参数url不能为空"
	        });
	    }
	});

	app.get("/short/url/:uri", function(req, res, next){
	    if( !!urls[req.params.uri] ){
	        res.redirect(urls[req.params.uri]);
	    } else {
	        next();
	    }
	});
}