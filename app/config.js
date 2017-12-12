angular.module('LotoApp').constant('APP_CONFIG', {
	//servicesUrl: "http://192.168.1.18:8080/api",
	servicesUrl:"https://loteria-back.appspot.com/api",
	checkinterval:60,//en segundos
	codigoOK: 200,
	codigoError: 555,
	codigoNotFound: 404,
	codigoNoAutorizado: 403
});