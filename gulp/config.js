var fs=require("fs");
var path=require("path");
var argv = require('yargs').argv;

var paths = {
	app: "app",
    modules:"app/modules",
	vendor: "bower_components",
	scss: "sass",
	css: "app/css",
	target: "www",
	targetVendor: "www/bower_components",
	targetCSS: "www/css",
	tmp:"./tmp"
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
	anyFile: "/**/*.*",
    facade:"/*ServiceFacade.js"
};



var vendorfiles=[

];



var options = {
	uglify: 'true',
	env: ''
};


var modules=getModules();


//intento establecer options.uglify y options.env de los parámetros de entrada
if (argv.uglify) {
	//console.log("-" + argv.uglify + "-")
	options.uglify = argv.uglify;
}else{
	//console.log("Por defecto-" + argv.uglify + "-")
	options.uglify='true';
}
if (argv.env) {
	options.env = argv.env;
}




function getModules(){
    var dir=paths.modules;
    return fs.readdirSync(dir)
		.filter(function (file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
}

module.exports={'paths':paths,'names':names,options:options,modules:modules,vendorfiles:vendorfiles};