angular.module("LotoApp.principal").component('appFooter',
    {
        templateUrl: 'modules/principal/components/footer/footer.tpl.html',
        controllerAs: 'vm',
        controller: ['$log','APP_CONFIG', footerController]
    });

function footerController($log,APP_CONFIG) {
    var vm = this;
    angular.extend(vm, {
        $onInit:$onInit,
        constantes:APP_CONFIG
    });


    function $onInit(){
        $log.debug("En el $onInit del componente pie");
    }
}