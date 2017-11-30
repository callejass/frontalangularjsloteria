
angular.module("LotoApp.principal").component('home',
    {
        templateUrl: 'modules/principal/components/home/home.tpl.html',
        controllerAs: 'vm',
        controller: ['$log','APP_CONFIG','$state',"principal", homeController]
    });

function homeController($log,APP_CONFIG,$state,principal) {
    var vm = this;
    angular.extend(vm, {
        $onInit:$onInit,
        constantes:APP_CONFIG,
        $state:$state,
        desconectar:desconectar,
        principal:principal
       
    });


    function $onInit(){
        $log.debug("En el $onInit del componente home");
    }
    function desconectar(){
        principal.removeToken();
        $state.go("home");
    }
}