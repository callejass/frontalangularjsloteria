angular.module("LotoApp.principal").component("adminmisdecimosdetalle", {
    bindings:{
        decimo:"<decimoseleccionado"
    },
    templateUrl: "modules/principal/components/misdecimos/admin/detalle.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService","$log", adminMisdecimosDetalleController]
});

function adminMisdecimosDetalleController(backoffice, bsLoadingOverlayService,$log) {

    var vm = this;
    angular.extend(vm, {        
        /*decimo: {
            numero:null,
            importe:null,
            descripcion:"",
            _id:""
        },*/
        error:null,
        info:null,
        $onInit: $onInit,
        $onChanges:$onChanges,
        cancelar:cancelar,
        guardar:guardar

    });
    function $onInit(){

    }
    function $onChanges(cambios){
        //en el onchanges
        $log.debug(JSON.stringify(cambios.decimo));
        reset();        
    }

    function cancelar(){
        vm.decimo=null;
        reset();
    }
    function reset(){        
        vm.error=null;
        vm.info=null;
        vm.frmdetalle.$setPristine();
        
    }
    function guardar(){
        if(vm.decimo._id){
            vm.info="Décimo modificado correctamente";
            //llamamos a modificar
        }else{
            vm.info="Décimo creado correctamente";
            //llamamos a crear
        }
    }




}