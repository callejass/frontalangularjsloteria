var gulp = require('gulp'),
	lr = require('gulp-livereload'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	htmlreplace = require('gulp-html-replace'),
	htmlify = require('gulp-angular-htmlify'),
	//sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	bodyParser = require('body-parser'),
	cleanCss = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	replacetask = require('gulp-replace-task'),
	rename = require('gulp-rename'),
	del = require('del'),
	gulpSequence = require('gulp-sequence'),
	argv = require('yargs').argv,
	gulpif = require('gulp-if'),
	path = require('path');

var fs = require("fs");

var exphbs = require('express-handlebars');
var options = {
	uglify: 'true',
	env: ''
};
if (argv.uglify) {
	console.log("-" + argv.uglify + "-")
	options.uglify = argv.uglify;
}else{
	console.log("Por defecto-" + argv.uglify + "-")
	options.uglify='true';
}
if (argv.env) {
	options.env = argv.env;
}
var paths = {
	app: "app",
	vendor: "bower_components",
	scss: "sass",
	css: "app/css",
	target: "../../../target/app",
	targetVendor: "../../../target/app/bower_components",
	targetCSS: "../../../target/app/css"
};

var names = {
	anyJS: "/**/*.js",
	anyFontsWoff: "/**/*.woff",
	anyFontsEot: "/**/*.eot",
	anyFontsSvg: "/**/*.svg",
	anyFontsTtf: "/**/*.ttf",
	anyHTML: "/**/*.html",
	anyCSS: "/**/*.css",
	anySCSS: "/**/*.scss",
	minJS: "app.min.js",
	minFacadeJS:"facade.min.js",
	minCSS: "app.min.css",
	anyFile: "/**/*.*"
};

function initializeHandlebars(exphbs) {

	var hb = exphbs({
		// Specify helpers which are only registered on this instance.
		helpers: {
			times: function (n, block) {
				var accum = '';
				for (var i = 0; i < n; ++i) {
					block.data.index = i;
					block.data.first = i === 0;
					block.data.last = i === (n - 1);
					accum += block.fn(this);
				}
				return accum;
			},
			ifCond: function (v1, operator, v2, options) {
				switch (operator) {
					case '==':
						return (v1 == v2) ? options.fn(this) : options.inverse(this);
					case '===':
						return (v1 === v2) ? options.fn(this) : options.inverse(this);
					case '!=':
						return (v1 != v2) ? options.fn(this) : options.inverse(this);
					case '!==': {
						return (v1 !== v2) ? options.fn(this) : options.inverse(this);
					}
					case '<':
						return (v1 < v2) ? options.fn(this) : options.inverse(this);
					case '<=':
						return (v1 <= v2) ? options.fn(this) : options.inverse(this);
					case '>':
						return (v1 > v2) ? options.fn(this) : options.inverse(this);
					case '>=':
						return (v1 >= v2) ? options.fn(this) : options.inverse(this);
					case '&&':
						return (v1 && v2) ? options.fn(this) : options.inverse(this);
					case '||':
						return (v1 || v2) ? options.fn(this) : options.inverse(this);
					default:
						return options.inverse(this);
				}
			}
		}
	});

	return hb;
}

function startExpress(enviroment) {
	var express = require('express');
	var app = express();

	// DEV: Con librerias sin minificar, con mocks y con livereload
	// TEST: Librerias minificadas, con mocks y sin livereload
	// ELSE: Librerias minificadas, sin mocks y sin livereload
	if (enviroment === "dev") {
		app.use(require('connect-livereload')());
		app.use(express.static(__dirname + "/" + paths.app));
		app.use(express.static(__dirname + "/"));

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.set('views', path.join(__dirname, 'mocks'));
		var handlebars = initializeHandlebars(exphbs);
		app.engine('handlebars', handlebars);
		app.set('view engine', 'handlebars');

		app.post("/api/", function (req, res) {
			res.render(req.body.serviceId, { layout: false, inputMap: req.body.inputMap });
		});

		// Start livereload
		lr.listen(35729);
	} else if (enviroment === "test") {
		app.use(express.static(__dirname + "/" + paths.target));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.post("/api/", function (req, res) {
			res.sendFile(req.body.servicio + ".json", { root: './mocks' });
		});
	} else {
		app.use(express.static(__dirname + "/" + paths.target));
	}
	app.listen(8080);
}

function notifyLivereload(file) {
	console.log("Notificado un cambio");
	lr.reload(file);
}

//compila scss
gulp.task('compileCSS', function () {
	console.log("Actualizando CSSs");
	/* return gulp.src([paths.scss + '/style.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(paths.css)); */
});

//ejecuta jshint
gulp.task('validate', function () {
	return gulp.src([paths.app + names.anyJS])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

//mueve los ficheros a folder target
//copia cualquier archivo que no sea .js .html ni .css de la carpeta app a la carpeta target
gulp.task('copy', function () {
	return gulp.src([paths.app + names.anyFile,
	'!' + paths.app + names.anyJS,
	'!' + paths.app + names.anyCSS,
	'!' + paths.app + names.anyHTML])
		.pipe(gulp.dest(paths.target));
});


//copia todos los archivos de vendors a la carpeta target/app/bower_components
gulp.task('moveVendorToDist', function () {
	return gulp.src([paths.vendor + names.anyJS,
	paths.vendor + names.anyCSS,
	paths.vendor + names.anyFontsWoff,
	paths.vendor + names.anyFontsTtf,
	paths.vendor + names.anyFontsEot,
	paths.vendor + names.anyFontsSvg])
		.pipe(gulp.dest(paths.targetVendor));

});

//devuelve todos los directorios hijos de uno dado
function getFolders(dir) {
	return fs.readdirSync(dir)
		.filter(function (file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
}


gulp.task('minifyJS', function () {



	var folders = getFolders(paths.app + "/modules");
	var tasks = folders.map(function (folder) {
		console.log(folder);
		// Minificamos todos los JS de la aplicacion
		// ToDo: si se desea especificar un orden de empaquetado de JS ira aqui, sino sera alfabetico
		return gulp.src([paths.app + '/modules/' + folder +'/' + folder + '.module.js',paths.app + '/modules/' + folder +'/**/*.js'])
			/*.pipe(order(
                 [folder + ".module.js"]
                 ))*/
			.pipe(concat(folder + ".min.js"))
			.pipe(ngAnnotate())
			.pipe(gulpif(options.uglify === 'true', uglify()))
			.pipe(gulp.dest(paths.target));
	});

	//compilar y desplegar el fichero de la aplicación principal
	var minifyapp=gulp.src([paths.app + '/app.js',  paths.target + '/config_pro.js'])
			.pipe(concat(names.minJS))
			.pipe(ngAnnotate())
			.pipe(gulpif(options.uglify === 'true', uglify()))
			.pipe(gulp.dest(paths.target));


	var minifyfacade=gulp.src([paths.app + '/*ServiceFacade.js'])
			.pipe(concat(names.minFacadeJS))
			.pipe(ngAnnotate())
			.pipe(gulpif(options.uglify === 'true', uglify()))
			.pipe(gulp.dest(paths.target));

	tasks.push(minifyapp);
	tasks.push(minifyfacade);

	gulpSequence(tasks);

});
gulp.task('minifyJSOld', function () {
	// Minificamos todos los JS de la aplicacion
	// ToDo: si se desea especificar un orden de empaquetado de JS ira aqui, sino sera alfabetico
	return gulp.src([paths.app + '/app.js', '!' + paths.app + '/config.js', paths.target + '/config_pro.js', paths.app + '/**/*.js'])
		.pipe(concat(names.minJS))
		.pipe(ngAnnotate())
		.pipe(gulpif(options.uglify === 'true', uglify()))
		.pipe(gulp.dest(paths.target));
});

gulp.task('minifyCSS', function () {
	// Minificamos todos los CSS de la aplicacion
	// ToDo: si se desea especificar un orden de empaquetado de CSS ira aqui, sino sera alfabetico
	return gulp.src([paths.css + '/style.css'])
		.pipe(concat(names.minCSS))
		.pipe(cleanCss({ compatibility: 'ie8' }))
		.pipe(gulp.dest(paths.targetCSS));
});

//modifica el index.html para eliminar las referencias a los archivos js individuales e incluir 
// las referencias a cada uno de los archivos js de los módulos y del app.min.js
gulp.task('minify', ['minifyCSS', 'minifyJS'], function () {
	
	var modulos = getFolders(paths.app + "/modules").map(function(item){
		return item + ".min.js";
	});
	modulos.push(names.minFacadeJS);
	modulos.push(names.minJS);
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
			'CSS': ['css/' + names.minCSS],
			'JS':modulos// [names.minJS]
		}, { 'keepUnassigned': true, 'keepBlockTags': true }))
		.pipe(gulp.dest(paths.target));
});

// Debe lanzarse antes que las tareas de minificados
//copia todos los html
gulp.task('htmlify', function () {
	return gulp.src([paths.app + names.anyHTML])
		.pipe(htmlify())
		.pipe(gulp.dest(paths.target));
});

//Modifica la configuracion para desactivar el modo desarrollo 
gulp.task('prepareProductionServer', function () {
	var defaultConfigFile = 'app/config.js';
	if (options.env.length > 0) {
		defaultConfigFile = 'app/config_' + options.env + '.js';
	}
	return gulp.src(defaultConfigFile)
		//.pipe(replace('isDevelopment:', 'isDevelopment: false,'))
		//Ponemos en modo desarrollo a false
		.pipe(replacetask({
			patterns: [
				{
					match: /(isDevelopment\s*:\s*true\s*,)/,
					replacement: 'isDevelopment: false,'
				}
			]
		}))
		.pipe(rename("config_pro.js"))
		.pipe(gulp.dest(paths.target));
});

// Modifica la configuracion para desactivar el modo desarrollo y la url de los servicios la hace relativa
gulp.task('prepareProductionConfig', function () {
	var defaultConfigFile = 'app/config.js';
	if (options.env.length > 0) {
		defaultConfigFile = 'app/config_' + options.env + '.js';
	}
	return gulp.src(defaultConfigFile)
		//Ponemos en modo desarrollo a false
		.pipe(replacetask({
			patterns: [
				{
					match: /(isDevelopment\s*:\s*true\s*,)/,
					replacement: 'isDevelopment: false,'
				}
			]
		}))
		//La url la hacemos relativa
		.pipe(replacetask({
			patterns: [
				{
					//match: /(servicesUrl: 'http:\/\/)([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)/,
					match:/(servicesUrl: ('|")http(s?):\/\/)([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)('|")/,
					replacement: 'servicesUrl: $2$6$7'
				}
			]
		}))

		.pipe(rename("config_pro.js"))
		.pipe(gulp.dest(paths.target));
});

// minifica y unifica
gulp.task('compileToDist', gulpSequence(['prepareProductionConfig'], ['copy'], ['htmlify'], ['minify'], ['moveVendorToDist'], ['deleteTemp']));

//// Levanta el servidor en modo test
gulp.task('startProductionServer', function (cb) {
	gulpSequence(['prepareProductionServer'], ['compileCSS'], ['copy'], ['htmlify'], ['minify'], ['moveVendorToDist'], ['deleteTemp'], cb);
	startExpress("test");
});

gulp.task('default', ['compileCSS'], function () {
	startExpress("dev");
	gulp.watch(paths.scss + names.anyFile, ["compileCSS"]);
	gulp.watch(paths.app + names.anyFile, notifyLivereload);
});

//Elimina el fichero temporal config_pro.js creado para modificar la configuracion de produccion
gulp.task('deleteTemp', function () {
	return del(paths.target + '/config_pro.js', { force: true });
});
