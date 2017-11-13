//fichero1
angular.module('myservicefacade', ['core']);

//fichero2
angular.module('myservicefacade').factory('nombremapa1',function(){
    blabla
});
angular.module('myservicefacade').factory('nombremapa2',function(){
    blabla
});
angular.module('myservicefacade').factory('nombremapa3',function(){
    blabla
});

//fichero 3
angular.module('myservicefacade').service('fachadadeservicios', ['nombremapa1','nombremapa2','nombremapa3', function ($nombremapa1, $nombremapa2, $nombremapa3) {

    return {

        callEjemplo : function () {
            return {
                srv: swfconnect($nombremapa1,$nombremapa2),
                mapasalida: $nombremapa1,
                mapaentrada: $nombremapa2
            }
        },
        callEjemplo : function () {
            return {
                srv: swfconnect($nombremapa1,$nombremapa2),
                mapasalida: $nombremapa1,
                mapaentrada: $nombremapa2
            }
        },
        callEjemplo : function () {
            return {
                srv: swfconnect($nombremapa1,$nombremapa2),
                mapasalida: $nombremapa1,
                mapaentrada: $nombremapa2
            }
        },


    };
}]);

//fichero4

//fichero 3
angular.module('myservicefacade').controller('mycontroller', ['fachadaservicios', function ($fachadaservicios) {

    $fachadaservicios.callEjemploSrv('');

}]);



