angular.module("LotoApp.principal").component("misdecimos", {
    templateUrl: "modules/principal/components/misdecimos/misdecimos.carrusel.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService", misdecimosController]
});


function misdecimosController(backoffice, bsLoadingOverlayService) {

    var vm = this;
    angular.extend(vm, {
        decimos: [],
        error:null,
        $onInit: $onInit,
        active:0,
        derecha:derecha,
        izquierda:izquierda

    })

    function $onInit() {
        loadDecimos();
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