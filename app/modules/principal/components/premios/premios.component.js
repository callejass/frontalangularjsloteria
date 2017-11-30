angular.module("LotoApp.principal").component('premios',
    {
        /* bindings:{
            $transition$: '<'
        }, */
        templateUrl: 'modules/principal/components/premios/premios.tpl.html',
        controllerAs: 'vm',
        controller: ['$log', "backoffice","bsLoadingOverlayService","uiservice", premiosController]
    });

function premiosController($log,backoffice,bsLoadingOverlayService,uiservice) {
    var vm = this;
    angular.extend(vm, {
        $onInit: $onInit,
        error:null,
        premios:{},
        refrescar:refrescar
    });


    function $onInit() {

        reload();
        $log.debug("En el $onInit del componente premios");
    }
    function refrescar(){
        reload();
    }
    function reload(){
        vm.error=null;
        bsLoadingOverlayService.start();
        backoffice.getPremiosPrincipales().then(
            function(response){
                vm.premios=response.data;
                uiservice.showInfo("Se han consultado los premios principales");
            },
            function(response){
               uiservice.showError("Se han consultado los premios principales");
               vm.error=response.data;// alert(response);
            }
        ).finally(function(){
            bsLoadingOverlayService.stop();
        });
    }


}