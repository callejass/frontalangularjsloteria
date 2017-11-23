angular.module("LotoApp.principal")
.factory("principal",["$http",function($http){

    var _token=localStorage.getItem("loteria.token");
    var _username=localStorage.getItem("loteria.username");
    

    return {
        setToken:setToken,
        getToken:getToken,
        setUsername:setUsername,
        getUsername:getUsername,
        removeToken:removeToken,
        isAuthenticated:isAuthenticated,
        logout:logout
        };



    function setToken(token){
        //lo guardo en la variable y en el localstorage
        localStorage.setItem("loteria.token",token);
        _token=token;
    }
    function getToken(){
        return _token;
    }
    function setUsername(username){
        _username=username;
        localStorage.setItem("loteria.username",username);
    }
    function getUsername(){return _username;}
    function removeToken(){
        _token=null;
        localStorage.removeItem("loteria.token");
    }
    function logout(){
        _token=null;
        localStorage.removeItem("loteria.token");
        _username=null;
        localStorage.removeItem("loteria.username");
    }
    function isAuthenticated(){
        return _token!==null;
    }
}]);