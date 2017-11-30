
//modifica el index.html para eliminar las referencias a los archivos js individuales e incluir 
// las referencias a cada uno de los archivos js de los módulos y del app.min.js
var gulp=require("gulp");
var htmlreplace = require('gulp-html-replace');
var replacetask = require('gulp-replace-task');

var paths=require("../config").paths;
var names=require("../config").names;
var modulos=require("../config").modules;

gulp.task('minify', ['minifyCSS', 'minifyJS'], function () {
	var fecha=new Date().getTime();;
	var modulosjs = modulos.map(function(item){
		return item + ".min.js?t=" + fecha;
	});
	//modulosjs.push(names.minFacadeJS);
	modulosjs.push(names.minJS + "?t=" + fecha);
	// Reemplazamos en el index la referencia de todas las rutas ../vendor por vendor
	return gulp.src(paths.app + '/index.html')
		.pipe(replacetask({
			patterns: [
				{
					match: /..\/bower_components/g,
					replacement: 'bower_components'
				}
			]
		}))
		.pipe(htmlreplace({
			'CSS': ['css/' + names.minCSS + "?t=" + fecha],
			'JS':modulosjs// [names.minJS]
		}, { 'keepUnassigned': true, 'keepBlockTags': true }))
		.pipe(gulp.dest(paths.target));
});
