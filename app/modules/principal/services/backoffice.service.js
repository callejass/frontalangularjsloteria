angular.module("LotoApp.principal").service("backoffice", ["APP_CONFIG", "$http", function (configuracion, $http) {

    var servicio = this;
    angular.extend(servicio, {
        getPremiosPrincipales: getPremiosPrincipales,
        sendLogin:sendLogin
    });


    function getPremiosPrincipales() {
        var url = configuracion.servicesUrl + "/consultas/principales";
        return $http.get(url, { cache: true });
    }
    function sendLogin(usuario,password) {
        var url=configuracion.servicesUrl + "/autenticar"
        var obj={user:usuario,password:password};
        //return $http.post(url, JSON.stringify({ "username": usuario, "password": password }),
        return $http.post(url, obj,
            {
                cache: false,
                headers: [{ "Content-Type": "application/json" }]
            });/* then(
            function (response) {
                //debugger;
                if (response.status == 200) {
                    deferer.resolve({ usuario: usuario, password: password, token: response.data.token });
                } else {
                    //alert("OK:" + JSON.stringify(response));                            
                    deferer.reject(response);
                }
            },
            function (response) {
                //debugger;
                //alert("ERROR:" +JSON.stringify(response));                        
                deferer.reject(response);
            }
            )
            .catch(function (response) {
                //debugger;
                //alert("catch:" + response);
                deferer.reject(response);
            }); */
    }

}]);