// Modifica la configuracion para desactivar el modo desarrollo y la url de los servicios la hace relativa
var gulp=require("gulp");
var rename=require("gulp-rename");
var replacetask = require('gulp-replace-task');
var paths=require("../config").paths;
var names=require("../config").names;
var options=require("../config").options;

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
		//.pipe(rename("config_pro.js"))
		.pipe(gulp.dest(paths.tmp));
});