var gulp=require("gulp");
var htmlify = require('gulp-angular-htmlify');
var paths=require("../config").paths;
var names=require("../config").names;
// Debe lanzarse antes que las tareas de minificados
//copia todos los html
gulp.task('htmlify', function () {
	return gulp.src([paths.app + names.anyHTML])
		.pipe(htmlify())
		.pipe(gulp.dest(paths.target));
});