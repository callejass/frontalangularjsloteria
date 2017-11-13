angular.module("LotoApp.principal").component('appHeader',
    {
        templateUrl: 'modules/principal/shared/header/header.tpl.html',
        controllerAs: 'vm',
        controller: ['$log','APP_CONFIG', headerController]
    });

function headerController($log,APP_CONFIG) {
    var vm = this;
    angular.extend(vm, {
        $onInit:$onInit,
        constantes:APP_CONFIG
    });


    function $onInit(){
        $log.debug("En el $onInit del componente header");
    }
}