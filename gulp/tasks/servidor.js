
var exphbs = require('express-handlebars');
var lr = require('gulp-livereload');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var path=require("path");
var paths=require("../config").paths;

exports.startExpress=function(enviroment) {
	var express = require('express');
	var app = express();
	console.log(__dirname);
	// DEV: Con librerias sin minificar, con mocks y con livereload
	// TEST: Librerias minificadas, con mocks y sin livereload
	// ELSE: Librerias minificadas, sin mocks y sin livereload
	if (enviroment === "dev") {
		app.use(require('connect-livereload')());
		app.use(express.static(__dirname + "/../../" + paths.app));		
		app.use(express.static(__dirname + "/../.."));

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
		app.use(express.static(__dirname + "/../../" + paths.target));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.post("/api/", function (req, res) {
			res.sendFile(req.body.servicio + ".json", { root: './mocks' });
		});
		lr.listen(35729);
	} else {
		app.use(express.static(__dirname + "/" + paths.target));
	}
	app.listen(80);
}

exports.notifyLivereload=function(file){
    console.log("Notificado un cambio");
	lr.reload(file);
}


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