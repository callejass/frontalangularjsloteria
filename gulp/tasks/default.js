var gulp=require("gulp");
var paths=require("../config").paths;
var names=require("../config").names;
var servidor=require("./servidor");

gulp.task('default', ['compileCSS'], function () {
	servidor.startExpress("dev");
	gulp.watch(paths.scss + names.anyFile, ["compileCSS"]);
	gulp.watch(paths.app + names.anyFile, servidor.notifyLivereload);
});