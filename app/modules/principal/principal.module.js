angular.module("LotoApp.principal",["ui.router",'bsLoadingOverlay']);


angular.module('LotoApp.principal').config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push('settokenInterceptor');
       
}]);



