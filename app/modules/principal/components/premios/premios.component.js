angular.module("LotoApp.principal").component('premios',
    {
        /* bindings:{
            $transition$: '<'
        }, */
        templateUrl: 'modules/principal/components/premios/premios.tpl.html',
        controllerAs: 'vm',
        controller: ['$log', "backoffice", "bsLoadingOverlayService", "uiservice", "$interval","APP_CONFIG", premiosController]
    });

function premiosController($log, backoffice, bsLoadingOverlayService, uiservice, $interval,APP_CONFIG) {
    var q=null;
    var vm = this;
    angular.extend(vm, {
        $onInit: $onInit,
        $onDestroy:$onDestroy,
        error: null,
        premios: {},
        refrescar: refrescar
    });


    function $onInit() {
        q = $interval(reload, APP_CONFIG.checkinterval * 1000, 0);
        reload();
        $log.debug("En el $onInit del componente premios");
    }
    function $onInit() {

        
        reload();
    }
    function $onDestroy() {
        $log.debug("Destruyendo el objeto estado");
        $interval.cancel(q);
    }


    function refrescar() {
        reload();
    }
    function reload() {
        vm.error = null;
        bsLoadingOverlayService.start();
        backoffice.getPremiosPrincipales().then(
            function (response) {
                vm.premios = response.data;
                //uiservice.showInfo("Se han consultado los premios principales");
            },
            function (response) {
                uiservice.showError("Se ha producido un error al consultar los premios");
                vm.error = response.data;// alert(response);
            }
        ).finally(function () {
            bsLoadingOverlayService.stop();
        });
    }


}