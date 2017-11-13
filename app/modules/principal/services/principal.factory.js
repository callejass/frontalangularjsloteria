angular.module("LotoApp.principal")
.factory("principal",["$http",function($http){

    var _token=localStorage.getItem("loteria.token");
    
    

    return {
        setToken:setToken,
        getToken:getToken,
        removeToken:removeToken,
        isAuthenticated:isAuthenticated
        };


    function setToken(token){
        //lo guardo en la variable y en el localstorage
        localStorage.setItem("loteria.token",token);
        _token=token;
    }
    function getToken(){
        return _token;
    }
    function removeToken(){
        _token=null;
        localStorage.removeItem("loteria.token");
    }
    function isAuthenticated(){
        return _token!==null;
    }
}]);