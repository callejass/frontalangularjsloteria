angular.module('LotoApp').constant('APP_CONFIG', {
	//servicesUrl: "http://192.168.1.18:3000/api",
	servicesUrl:"https://loteria-back.appspot.com/api",
	mocksUrl: "/api/",
	mocks: "mocks",
	application_id: 'MiPruebaWebapp',
	isDevelopment: true,
	codigoOK: 200,
	codigoError: 555,
	codigoNotFound: 404,
	codigoNoAutorizado: 403
});