angular.module("LotoApp.principal").component("adminmisdecimoslistado", {
    bindings:{
        onSelectDecimo:"&"
    },
    templateUrl: "modules/principal/components/misdecimos/admin/listado.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService", adminMisdecimosListadoController]
});

function adminMisdecimosListadoController(backoffice, bsLoadingOverlayService) {

    var vm = this;
    angular.extend(vm, {
        decimos: [],
        error: null,
        $onInit: $onInit,
        active: 0,
        deletedecimo:deletedecimo,
        selectdecimo:selectdecimo
    });

    function $onInit() {
        //reload();
        vm.decimos=[
            {_id:"a45f84edf88847fr",numero:1254,importe:40,descripcion:"La descripción"}
        ];
    }

    function reload() {
        bsLoadingOverlayService.start();
        backoffice.getDecimos().then(
            function (response) {
                
                vm.decimos = response.data;
            },
            function (response) {
                alert(response);
            })
            .finally(
            function () {
                bsLoadingOverlayService.stop();
            });
    }


    function deletedecimo(id){
       bsLoadingOverlayService.start();
        backoffice.deleteDecimo(id).then(
            function (response) {                
                //nada
            },
            function (response) {
                alert(response);
            })
            .finally(
            function () {
                bsLoadingOverlayService.stop();
                reload();
            }); 
    }
    function selectdecimo(id){
        alert(id);
        vm.onSelectDecimo({value:id});
    }

}