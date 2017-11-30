angular.module("LotoApp.principal").component("adminmisdecimosdetalle", {
    bindings:{
        decimoseleccionado:"<",
        onSave:"&"
    },
    templateUrl: "modules/principal/components/misdecimos/admin/detalle.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService","$log","uiservice", adminMisdecimosDetalleController]
});

function adminMisdecimosDetalleController(backoffice, bsLoadingOverlayService,$log,uiservice) {

    var vm = this;
    angular.extend(vm, {        
        decimo: {},
        $onInit: $onInit,
        $onChanges:$onChanges,
        cancelar:cancelar,
        guardar:guardar

    });
    function $onInit(){

    }
    function $onChanges(cambios){
        //en el onchanges
        $log.debug(cambios.isFirstChange);
        if(!cambios.isFirstChange){
            reset();
            if(cambios.decimoseleccionado.currentValue){
                loadDecimo(cambios.decimoseleccionado.currentValue._id);
            }else{
                vm.decimo={};
            } 
        }else{

        }
        /* $log.debug(JSON.stringify(cambios));
        $log.debug(JSON.stringify(cambios.decimoseleccionado)); */

    }

    function loadDecimo(id){
        bsLoadingOverlayService.start();
        backoffice.getDecimo(id).then(
            function(response){
                vm.decimo=response.data;
            },
            function(response){
                vm.error=response.message;
            }
        )
        .finally(function(){
            bsLoadingOverlayService.stop();
        });
    }
    function cancelar(){
        vm.decimo=null;
        reset();
    }
    function reset(){        
        vm.error=null;
        vm.info=null;
        if(vm.frmdetalle){
            vm.frmdetalle.$setPristine();
        }
        
        
    }
    function guardar(){
        bsLoadingOverlayService.start();
        if(vm.decimo._id){
            backoffice.updateDecimo(vm.decimo).then(
                function(response){
                    uiservice.showInfo("Décimo modificado correctamente");
                    vm.onSave();
                },
                function(response){
                    uiservice.showError(response);
                }
            ).finally(function(){
                bsLoadingOverlayService.stop();
            });
            
            //llamamos a modificar
        }else{
            backoffice.createDecimo(vm.decimo).then(
                function(response){
                    uiservice.showInfo("Décimo creado correctament");
                    vm.onSave();
                },
                function(response){
                    uiservice.showError(response);
                }
            ).finally(function(){
                bsLoadingOverlayService.stop();
            });
            //llamamos a crear
        }
    }




}