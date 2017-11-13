angular.module('LotoApp').constant('APP_CONFIG', {
	servicesUrl: "http://localhost:3000/api",
	mocksUrl: "/api/",
	mocks: "mocks",
	application_id: 'MiPruebaWebapp',
	isDevelopment: true,
	codigoOK: 200,
	codigoError: 555,
	codigoNotFound: 404,
	codigoNoAutorizado: 403
});