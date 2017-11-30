var gulp = require("gulp");
var paths = require("../config").paths;
var names = require("../config").names;
var vendorfiles = require("../config").vendorfiles;

//copia todos los archivos especificados carpeta target/app/bower_components
var ficheros = [
	paths.vendor + '/jquery/dist/jquery.min.js',
	paths.vendor + '/bootstrap/dist/**/*.*',
	paths.vendor + "/angular/angular.min.js",
	paths.vendor + "/angular-ui-router/release/angular-ui-router.min.js",
	paths.vendor + "/angular-loading-overlay/dist/angular-loading-overlay.js",
	paths.vendor + "/angular-loading-overlay-spinjs/dist/angular-loading-overlay-spinjs.js",
	paths.vendor + "/angular-bootstrap/ui-bootstrap-tpls.min.js",
	paths.vendor + "/angular-i18n/angular-locale_es-es.js",
	paths.vendor + "/angular-touch/angular-touch.min.js",
	paths.vendor + "/angular-animate/angular-animate.min.js"
];
gulp.task('moveVendorToDist', function () {
	return gulp.src(ficheros, { base: "bower_components" })
		.pipe(gulp.dest(paths.targetVendor));
});