angular.module("LotoApp.principal",["ui.router",'bsLoadingOverlay','ui.bootstrap','ngTouch','ngAnimate']);


angular.module('LotoApp.principal').config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push('settokenInterceptor');
       
}]);



