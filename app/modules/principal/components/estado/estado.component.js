angular.module("LotoApp.principal").component("estado", {
    bindings: {
    },
    controller: ["$interval","$log","backoffice", "APP_CONFIG",estadoController],
    controllerAs: "vm",
    templateUrl: '/modules/principal/components/estado/estado.tpl.html'
});
function estadoController($interval,$log,backoffice,APP_CONFIG) {


    var q=null;
    var vm = this;
    angular.extend(vm, {
        $onInit: $onInit,
        $onDestroy:$onDestroy,
        fecha: null,
        fechaconsulta:null,
        estado: "",
        error: 0
    });

    function $onInit() {

        q=$interval(reload,APP_CONFIG.checkinterval*1000,0);
        reload();
    }
    function $onDestroy(){
        $log.debug("Destruyendo el objeto estado");
        $interval.cancel(q);
    }
    function reload() {
        $log.debug("Recargando estado");
        backoffice.getEstadoSorteo().then(
            function (data) {
                //debugger;
                vm.fechaconsulta=Date.now();
                vm.fecha = new Date(data.timestamp * 1000);
                vm.error = data.error;
                switch (data.status) {
                    case 0:
                    vm.estado="El sorteo no ha comenzado aún";
                        break;
                    case 1:
                    vm.estado="El sorteo ha empezado";
                        break;
                    case 2:
                    vm.estado="El sorteo ha terminado";
                        break;
                    case 3:
                    vm.estado="El sorteo ha terminado";//. Lista  en pdf";
                        break;
                    case 4:
                    vm.estado="El sorteo ha terminado";//. Lista basada en la oficial";
                        break;
                }
                //vm.estado = data.status;
            },
            function (data) {
                vm.estado = data.mensaje;
                vm.error = data.error;
            }
        );
    }
}