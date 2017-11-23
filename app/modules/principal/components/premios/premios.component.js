angular.module("LotoApp.principal").component('premios',
    {
        /* bindings:{
            $transition$: '<'
        }, */
        templateUrl: 'modules/principal/components/premios/premios.tpl.html',
        controllerAs: 'vm',
        controller: ['$log', "backoffice","bsLoadingOverlayService", premiosController]
    });

function premiosController($log,backoffice,bsLoadingOverlayService) {
    var vm = this;
    angular.extend(vm, {
        $onInit: $onInit,
        error:null,
        premios:{}
    });


    function $onInit() {
       // debugger;
        //$log.debug(vm.$transition$.to());
        reload();
        $log.debug("En el $onInit del componente premios");
    }

    function reload(){
        vm.error=null;
        bsLoadingOverlayService.start();
        backoffice.getPremiosPrincipales().then(
            function(response){
                vm.premios=response.data;
            },
            function(response){
               vm.error=response.data;// alert(response);
            }
        ).finally(function(){
            bsLoadingOverlayService.stop();
        });
    }


}