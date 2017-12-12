angular.module("LotoApp.principal").service("backoffice", ["APP_CONFIG", "$http","$q","$log", function (configuracion, $http,$q,$log) {

    var servicio = this;
    angular.extend(servicio, {
       
        sendLogin:sendLogin,
        registrar:registrar,
        getDecimos:getDecimos,
        getDecimo:getDecimo,
        updateDecimo:updateDecimo,
        createDecimo:createDecimo,
        deleteDecimo:deleteDecimo,
        getPremiosPrincipales: getPremiosPrincipales,
        getPremio:getPremio,
        getEstadoSorteo:getEstadoSorteo
    });



    function getEstadoSorteo() {
        var url1 = configuracion.servicesUrl + "/consultas/estado";
        var url2= configuracion.servicesUrl + "/consultas/ultimaactualizacion";
        var promesas=[];
        promesas.push($http.get(url1, { cache: false }));
        promesas.push($http.get(url2, { cache: false }));
        var deferred = $q.defer();
        $q.all(promesas).then(
            function(values){
                //debugger;
                deferred.resolve({
                    status:values[0].data.status,
                    timestamp:values[1].data.timestamp,
                    error:values[0].data.error + values[1].data.error                    
                });       
            },
            function(values){
                deferred.reject({mensaje:"Se produjo un error al recuperar el estado del sorteo",error:1});
            });
        
        return deferred.promise;
        //return $http.get(url, { cache: true });
    }

    /**recupera los premios principales del sorteo */

    function getPremiosPrincipales() {
        var url = configuracion.servicesUrl + "/consultas/principales";
        return $http.get(url, { cache: true });
    }

    /**Recupera el posible premio para un número en concreto */
    function getPremio(numero){
        var url = configuracion.servicesUrl + "/consultas/" + numero;
      // $log.debug(url);
        return $http.get(url, { cache: false });
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
        
        var url=configuracion.servicesUrl + "/jugadas/" + id;
        
        return $http.delete(url);
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