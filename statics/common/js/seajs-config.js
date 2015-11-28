seajs.config({
	base: "/oop/",
	paths: {
		//"coding": "http://"+window.location.host
		"PathCodemirror": (/192\.168\.|172\.16./.test(window.location.href) ? "http://7u2of8.com1.z0.glb.clouddn.com" : "http://localhost:18080") + "/common/codemirror"
	},
	alias: {
		"jquery": "jquery/1.8.3/jquery.js"
	},
	preload: ["jquery"]
});
// jQuery暴露到全局
	// 2.1.1开始移除modify
	// seajs.modify("jquery", function(require, exports){
	// 	window.jQuery = window.$ = exports;
	// });
seajs.on('exec', function(module) {
   if (module.uri === seajs.resolve('jquery')) {
    	window.$ = window.jQuery = module.exports
   }
})
seajs.use("jquery",function($){
	window.jQuery = window.$ = $;
})