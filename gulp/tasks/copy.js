var gulp=require("gulp");
var paths=require("../config").paths;
var names=require("../config").names;
//mueve los ficheros a folder target
//copia cualquier archivo que no sea .js .html ni .css de la carpeta app a la carpeta target
gulp.task('copy', function () {
	return gulp.src([paths.app + names.anyFile,
	'!' + paths.app + names.anyJS,
	'!' + paths.app + names.anyCSS,
	'!' + paths.app + names.anyHTML])
		.pipe(gulp.dest(paths.target));
});