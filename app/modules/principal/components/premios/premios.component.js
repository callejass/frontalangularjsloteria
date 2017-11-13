angular.module("LotoApp.principal").component('premios',
    {
        /* bindings:{
            $transition$: '<'
        }, */
        templateUrl: 'modules/principal/components/premios/premios.tpl.html',
        controllerAs: 'vm',
        controller: ['$log', "backoffice", premiosController]
    });

function premiosController($log,backoffice) {
    var vm = this;
    angular.extend(vm, {
        $onInit: $onInit,
        premios:{}
    });


    function $onInit() {
       // debugger;
        //$log.debug(vm.$transition$.to());
        backoffice.getPremiosPrincipales().then(
            function(response){
                vm.premios=response.data;
            },
            function(response){
                alert(response);
            }
        );
        $log.debug("En el $onInit del componente premios");
    }
}