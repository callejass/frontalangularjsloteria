angular.module("LotoApp.principal").service("uiservice", ["$timeout", "$http", "bsLoadingOverlayService", function ($timeout, $http, bsLoadingOverlayService) {


    var servicio = this;
    angular.extend(servicio, {
        showError: showError,
        showInfo: showInfo,
        startLoading: startLoading,
        stopLoading: stopLoading,
        mensaje: null,
        error: false
    });

    function startLoading() {
        bsLoadingOverlayService.start();
    }
    function stopLoading(){
        bsLoadingOverlayService.stop();
    }
    function showError(m) {
        servicio.mensaje = m;
        servicio.error = true;
        $timeout(eliminarMensaje, 3000);
    }
    function showInfo(m) {
        servicio.error = false;
        servicio.mensaje = m;
        $timeout(eliminarMensaje, 3000);
    }

    function eliminarMensaje() {
        servicio.mensaje = null;
        servicio.error = false;
    }


}])  