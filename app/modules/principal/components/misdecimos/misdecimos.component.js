angular.module("LotoApp.principal").component("misdecimos", {
    templateUrl: "modules/principal/components/misdecimos/misdecimos.todos.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService", misdecimosController]
});


function misdecimosController(backoffice, bsLoadingOverlayService) {

    var vm = this;
    angular.extend(vm, {
        decimos: [],
        error:null,
        $onInit: $onInit,
        active:0

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


}