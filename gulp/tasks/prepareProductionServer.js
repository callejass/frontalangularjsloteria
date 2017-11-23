//Modifica la configuracion para desactivar el modo desarrollo 
var gulp=require("gulp");
var rename=require("gulp-rename")
var replacetask = require('gulp-replace-task');
var paths=require("../config").paths;
var names=require("../config").names;
var options=require("../config").options;


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
		//.pipe(rename("config_pro.js"))
		.pipe(gulp.dest(paths.tmp));
});