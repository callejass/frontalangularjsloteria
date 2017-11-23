angular.module("LotoApp.principal").component("adminmisdecimosdetalle", {
    templateUrl: "modules/principal/components/misdecimos/admin/detalle.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService", adminMisdecimosDetalleController]
});

function adminMisdecimosDetalleController(backoffice, bsLoadingOverlayService) {

    var vm = this;
    angular.extend(vm, {
        decimo: {
            numero:null,
            importe:null,
            descripcion:"",
            _id:""
        },
        error:null,
        $onInit: $onInit,
        active:0

    });
    function $onInit(){

    }
}