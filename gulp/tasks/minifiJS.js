var gulp = require('gulp'),	
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),										
	gulpSequence = require('gulp-sequence'),
	argv = require('yargs').argv,
	gulpif = require('gulp-if');
	

var paths=require("../config").paths;
var names=require("../config").names;
var options=require("../config").options;
var modulos=require("../config").modules;

/*gulp.task("prueba",function(){
    console.log(JSON.stringify(require("../config")));
});*/
gulp.task('minifyJS', function () {

	//var folders = getFolders(paths.app + "/modules");
	var tasks = modulos.map(function (modulo) {
		console.log(modulo);
		// Minificamos todos los JS de la aplicacion
		// ToDo: si se desea especificar un orden de empaquetado de JS ira aqui, sino sera alfabetico
        //meto en el minimizado de todos los módulos el facade
        //TODO: falta por ver como ponemos la configuración
		return gulp.src([paths.app + names.facade,paths.modules + '/' + modulo +'/' + modulo + '.module.js',paths.modules + '/' + modulo +'/**/*.js'])
			/*.pipe(order(
                 [folder + ".module.js"]
                 ))*/
			.pipe(concat(modulo + ".min.js"))
			.pipe(ngAnnotate())
			.pipe(gulpif(options.uglify === 'true', uglify()))
			.pipe(gulp.dest(paths.target));
	});

	//compilar y desplegar el fichero de la aplicación principal
	//var minifyapp=gulp.src([paths.app + '/*.js',"!" + paths.app + "/config.js",  paths.target + '/config_pro.js'])
	var minifyapp=gulp.src([paths.app + '/app.js',  paths.tmp + '/config.js'])
			.pipe(concat(names.minJS))
			.pipe(ngAnnotate())
			.pipe(gulpif(options.uglify === 'true', uglify()))
			.pipe(gulp.dest(paths.target));


	var minifyfacade=gulp.src([paths.app + names.facade])
			.pipe(concat(names.minFacadeJS))
			.pipe(ngAnnotate())
			.pipe(gulpif(options.uglify === 'true', uglify()))
			.pipe(gulp.dest(paths.target));

	tasks.push(minifyapp);
	tasks.push(minifyfacade);

	gulpSequence(tasks);

});