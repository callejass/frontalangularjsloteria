var gulp = require('gulp'),	
	sass = require('gulp-sass'),	
	autoprefixer = require('gulp-autoprefixer'),	
    paths=require("../config").paths;
//compila scss
gulp.task('compileCSS', function () {
	console.log("compilando CSSs del directorio" + paths.scss);
	return gulp.src([paths.scss + '/style.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(paths.css));
});