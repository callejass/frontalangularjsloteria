angular.module("LotoApp.principal").component("decimo", {
    bindings: {
        inputdata: "<"
    },
    templateUrl: "modules/principal/components/misdecimos/decimo/decimo.tpl.html",
    controllerAs: "vm",
    controller: ["backoffice", "bsLoadingOverlayService", "$timeout", decimoController]
});


function decimoController(backoffice, bsLoadingOverlayService, $timeout) {

    var vm = this;
    angular.extend(vm, {
        premio: 0,
        error: null,
        $onInit: $onInit,
        comprobar: comprobar,
        url: 'images/bck_boleto_resguardo_responsive.png'
    })

    function $onInit() {
        // loadDecimos();
        //vm.url="https://www.sorteonacional.com/decimos/2017/decimo-loteria-2017-" + vm.inputdata.numero + "-1-1-" + vm.inputdata.importe + ".png";
        //images/bck_boleto_resguardo_responsive.png
        comprobar();
    }



    function comprobar() {
        vm.error = null;
        bsLoadingOverlayService.start()
        backoffice.getPremio(vm.inputdata.numero).then(
            function (response) {
                /* debugger;
                alert(JSON.stringify( response.data)); */
                vm.premio = response.data.premio*vm.inputdata.importe/20;

            },
            function (response) {
                debugger;

            }
        ).finally(function () {
            bsLoadingOverlayService.stop();

        });
    }


}