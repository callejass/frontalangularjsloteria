var gulp=require("gulp");
var jshint=require("jshint");
var paths=require("../config").paths;
var names=require("../config").names;
//ejecuta jshint
gulp.task('validate', function () {
	return gulp.src([paths.app + names.anyJS])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});