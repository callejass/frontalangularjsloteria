var gulp=require("gulp");
var concat=require("gulp-concat");
var cleanCss = require('gulp-clean-css');
var paths=require("../config").paths;
var names=require("../config").names;


gulp.task('minifyCSS', function () {
	// Minificamos todos los CSS de la aplicacion
	// ToDo: si se desea especificar un orden de empaquetado de CSS ira aqui, sino sera alfabetico
	return gulp.src([paths.css + '/style.css'])
		.pipe(concat(names.minCSS))
		.pipe(cleanCss({ compatibility: 'ie8' }))
		.pipe(gulp.dest(paths.targetCSS));
});