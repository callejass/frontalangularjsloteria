angular.module("LotoApp.principal").component("otrosdecimos", {
    templateUrl: "modules/principal/components/otrosdecimos/otrosdecimos.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService", otrosdecimosController]
});

function otrosdecimosController(backoffice, bsLoadingOverlayService) {
    
        var vm = this;
        angular.extend(vm, {
            decimos:[],
            numero:'',
            comprobar:comprobar,
            limpiar:limpiar,
            error:null,
            $onInit: $onInit,
            active:0,
            derecha:derecha,
            izquierda:izquierda
    
        })
    
        function $onInit() {
            //loadDecimos();
        }
    
        function comprobar(){
            var decimo={
                numero:vm.numero,
                importe:20,
                descripción:''
            }
            vm.decimos.push(decimo);
            //angular.copy(decimo,vm.decimo);
            //vm.decimos.push(decimo);
        }
        function limpiar(){
            vm.decimos=[];
        }
        function loadDecimos() {
            vm.error=null;
            bsLoadingOverlayService.start()
            backoffice.getDecimos().then(
                function (response) {
                    vm.decimos = response.data;
                },
                function (response) {                
                    vm.error=response.data;
                }
            ).finally(function () { bsLoadingOverlayService.stop() });
        }
    
        function derecha(){
            
           
            if(vm.active>0){
                vm.active--;
            }else{
                vm.active=vm.decimos.length-1;
            }
        }
        function izquierda(){
            
            if(vm.active<vm.decimos.length-1){
                vm.active++;
                
            }else{
                vm.active=0;
            }
        }
    
    }