angular.module("LotoApp.principal").component("adminmisdecimos", {
    templateUrl: "modules/principal/components/misdecimos/admin/index.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService", adminMisdecimosIndexController]
});

function adminMisdecimosIndexController(backoffice, bsLoadingOverlayService) {

    var vm = this;
    angular.extend(vm, {
        decimos: [],
        error:null,
        $onInit: $onInit,
        fecha:null,
        decimoSeleccionado:decimoSeleccionado,
        actualizar:actualizar,
    })
    function $onInit(){

    }
    function decimoSeleccionado(value){
        
        vm.decimoseleccionado=value;
    }
    function actualizar(){
        vm.fecha=Date.now();
    }
}
