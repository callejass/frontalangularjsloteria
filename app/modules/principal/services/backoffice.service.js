angular.module("LotoApp.principal").service("backoffice", ["APP_CONFIG", "$http", function (configuracion, $http) {

    var servicio = this;
    angular.extend(servicio, {
        getPremiosPrincipales: getPremiosPrincipales,
        sendLogin:sendLogin,
        registrar:registrar,
        getDecimos:getDecimos
    });


    /**recupera los premios principales del sorteo */

    function getPremiosPrincipales() {
        var url = configuracion.servicesUrl + "/consultas/principales";
        return $http.get(url, { cache: true });
    }
    function getPremio(numero){
        var url = configuracion.servicesUrl + "/consultas/" + numero;
        return $http.get(url, { cache: true });
    }
    function getDecimos(){
        var url=configuracion.servicesUrl + "/jugadas";
        return $http.get(url,{cache:false});
    }

    
    /**registra un usuario */
    function registrar(usuario,password){
        var url=configuracion.servicesUrl + "/registrar";
        var obj={user:usuario,password:password};
        return $http.post(url, obj,
            {
                cache: false,
                headers: [{ "Content-Type": "application/json" }]
            }); 
    }

    /**
     * envia los datos para hacer login
     */
    function sendLogin(usuario,password) {
        var url=configuracion.servicesUrl + "/autenticar"
        var obj={user:usuario,password:password};
        //return $http.post(url, JSON.stringify({ "username": usuario, "password": password }),
        return $http.post(url, obj,
            {
                cache: false,
                headers: [{ "Content-Type": "application/json" }]
            });
    }


}]);