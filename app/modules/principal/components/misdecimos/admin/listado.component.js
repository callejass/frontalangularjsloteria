angular.module("LotoApp.principal").component("adminmisdecimoslistado", {
    bindings:{
        onSelectDecimo:"&",
        ultimaactualizacion:"<"
    },
    templateUrl: "modules/principal/components/misdecimos/admin/listado.tpl.html",
    controllerAs: "vm",
    controller: ["$log","backoffice", "uiservice", adminMisdecimosListadoController]
});

function adminMisdecimosListadoController($log,backoffice, uiservice) {

    var vm = this;
    angular.extend(vm, {
        decimos: [],
        error: null,
        $onInit: $onInit,
        $onChanges:$onChanges,
        active: 0,
        deletedecimo:deletedecimo,
        selectdecimo:selectdecimo
    });

    function $onInit() {
        //reload();
       /*  vm.decimos=[
            {_id:"a45f84edf88847fr",numero:1254,importe:40,descripcion:"La descripción"},
            {_id:"a45f84jjjjjj847fr",numero:78536,importe:6.66,descripcion:"Dokan"},
            {_id:"kkkkkkkkkkk",numero:142,importe:20,descripcion:"Otro"}
        ]; */
    }

    function $onChanges(){
        $log.debug("En el onchanges del listado");
        reload();
    }
    function reload() {
        uiservice.startLoading();
        backoffice.getDecimos().then(
            function (response) {                
                vm.decimos = response.data;
            },
            function (response) {
                uiservice.showError(response);
            })
            .finally(
            function () {
                uiservice.stopLoading();
            });
    }


    function deletedecimo(id){
        uiservice.startLoading();
        backoffice.deleteDecimo(id).then(
            function (response) {                
                
                //debugger;
            },
            function (response) {
                uiservice.showError(response);
            })
            .finally(
            function () {
                uiservice.stopLoading();
                reload();
            }); 
    }
    function selectdecimo(decimo){
        //alert(id);
        vm.onSelectDecimo({value:decimo});
    }

}