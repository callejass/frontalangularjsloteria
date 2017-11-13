angular.module("LotoApp.principal").factory("settokenInterceptor", function () {
    
    
        return {
            request: request/* ,
            response: response */
            //responseError: responseError
        };
    
        function request(config) {        
            var token = localStorage.getItem("loteria.token");
            if (token !== undefined && token!==null) {
                config.headers["x-access-token"] =  token;
            }
            //alert(JSON.stringify(config));
            return config;
        }
    
        /*function requestError(config) {
            return config;
        }*/
        function response(res) {        
            return res;
        }
        /*function responseError(response) {
            return response;
        }*/
    
    });