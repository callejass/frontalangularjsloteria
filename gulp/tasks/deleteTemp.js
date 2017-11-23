var gulp=require("gulp");
var del = require('del');
var paths=require("../config").paths;
var names=require("../config").names;
//Elimina el fichero temporal config_pro.js creado para modificar la configuracion de produccion
gulp.task('deleteTemp', function () {	
	return del(paths.tmp + '/config.js', { force: true });
});