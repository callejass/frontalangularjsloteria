angular.module("LotoApp.principal").service("backoffice", ["APP_CONFIG", "$http", function (configuracion, $http) {

    var servicio = this;
    angular.extend(servicio, {
        getPremiosPrincipales: getPremiosPrincipales,
        sendLogin:sendLogin,
        registrar:registrar,
        getDecimos:getDecimos,
        getPremio:getPremio
    });



    function getEstadoSorteo() {
        var url = configuracion.servicesUrl + "/consultas/estado";
        return $http.get(url, { cache: true });
    }

    /**recupera los premios principales del sorteo */

    function getPremiosPrincipales() {
        var url = configuracion.servicesUrl + "/consultas/principales";
        return $http.get(url, { cache: true });
    }

    /**Recupera el posible premio para un número en concreto */
    function getPremio(numero){
        var url = configuracion.servicesUrl + "/consultas/" + numero;
        return $http.get(url, { cache: true });
    }
    function getDecimos(){
        var url=configuracion.servicesUrl + "/jugadas";
        return $http.get(url,{cache:false});
    }

    function getDecimo(id){
        var url=configuracion.servicesUrl + "/jugadas/" + id;
        return $http.get(url,{cache:false});
    }
    function createDecimo(decimo){
        var url=configuracion.servicesUrl + "/jugadas";        
        return $http.post(url,decimo);
    }
    function updateDecimo(decimo){
        var url=configuracion.servicesUrl + "/jugadas";        
        return $http.put(url,decimo);
    }
    function deleteDecimo(id){
        var url=configuracion.servicesUrl + "/jugadas"
    }
    
    /**registra un usuario */
    function registrar(usuario,password){
        var url=configuracion.servicesUrl + "/usuarios";
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