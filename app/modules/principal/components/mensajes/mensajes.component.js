angular.module("LotoApp.principal").component('mensajes',
    {
        templateUrl: 'modules/principal/components/mensajes/mensajes.tpl.html',
        controllerAs: 'vm',
        controller: ["uiservice", mensajesController]
    });

function mensajesController(uiservice) {
    var vm = this;
    angular.extend(vm, {
        uiservice: uiservice,
        $onInit: $onInit
    });


    function $onInit() {

        //uiservice.showInfo("Hola");
    }
}