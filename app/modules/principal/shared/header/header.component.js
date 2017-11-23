angular.module("LotoApp.principal").component('appHeader',
    {
        templateUrl: 'modules/principal/shared/header/header.tpl.html',
        controllerAs: 'vm',
        controller: ['$log','APP_CONFIG','principal','$state', headerController]
    });

function headerController($log,APP_CONFIG,principal,$state) {
    var vm = this;
    angular.extend(vm, {
        $onInit:$onInit,
        constantes:APP_CONFIG,
        principal:principal,
        salir:salir
    });


    function $onInit(){
        $log.debug("En el $onInit del componente header");
    }
    function salir(){
        principal.logout();
        $state.go("home");
    }
}