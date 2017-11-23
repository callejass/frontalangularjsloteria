//// Levanta el servidor en modo test
var gulp=require("gulp");
var rename=require("gulp-rename")
var replacetask = require('gulp-replace-task');
var gulpSequence=require("gulp-sequence");
var paths=require("../config").paths;
var names=require("../config").names;
var options=require("../config").options;
var servidor=require("./servidor");
gulp.task('startProductionServer', function (cb) {
	gulpSequence(['prepareProductionServer'], ['compileCSS'], ['copy'], ['htmlify'], ['minify'], ['moveVendorToDist'], ['deleteTemp'], cb);
	
	servidor.startExpress("test");
	/*gulp.watch(paths.app + names.anyFile,function(fichero){
		console.log(fichero);
		gulpSequence(["compileCSS"],["copy"],["htmlify"],["minify"]);
		servidor.notifyLivereload();
	});*/
	//gulp.watch(paths.target + names.anyFile,["compileCSS","copy","htmlify","minify"]);
	
//	gulp.watch(paths.target + names.anyFile, notifyLivereload);
});