angular.module("LotoApp.principal").component("estado", {
    bindings: {
    },
    controller: ["backoffice", estadoController],
    controllerAs: "vm",
    templateUrl: '/modules/principal/components/estado/estado.tpl.html'
});
function estadoController(backoffice) {

    var vm = this;
    angular.extend(vm, {
        $onInit: $onInit,
        fecha: null,
        estado: "",
        error: 0
    });

    function $onInit() {
        reload();
    }

    function reload() {
        backoffice.getEstadoSorteo().then(
            function (data) {
                //debugger;
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
                    vm.estado="El sorteo ha terminado. Lista  en pdf";
                        break;
                    case 4:
                    vm.estado="El sorteo ha terminado. Lista basada en la oficial";
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