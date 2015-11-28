var gulp = require("gulp")
	, concat = require("gulp-concat") // 拼接
	, uglify = require("gulp-uglify") // 丑化
	, jshint = require("gulp-jshint") // 日志
	, watch = require("gulp-watch")
	;

gulp.task("seajs", function(){
	gulp.src(["common/js/seajs-debug.js", "common/js/seajs-config.js"])
		.pipe(uglify())
		.pipe(concat("seajs.min.js"))
		.pipe(gulp.dest("common/js"));
});