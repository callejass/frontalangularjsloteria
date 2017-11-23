angular.module("LotoApp.principal").component("registro", {
    bindings: {	        
    },
    controller: ["$state", "backoffice", "principal","$timeout","bsLoadingOverlayService",registroController],
    controllerAs: "vm",
    templateUrl:'/modules/principal/components/registro/registro.tpl.html'
});

function registroController($state, backoffice, principal,$timeout,bsLoadingOverlayService) {
var vm = this;
angular.extend(vm, {
    usuario: '',
    password: '',
    registrar: registrar,
    error:null,
    success:null
});

function setLocale(loc){
    //alert($translate.get)
    $translate.use(loc);
}
function registrar() {  
    vm.success=null;
    vm.error=null;      
    bsLoadingOverlayService.start();
    backoffice.registrar(vm.usuario, vm.password).then(
       function (response) {
           
           /* alert(JSON.stringify(response.data)); */
            vm.success="Se ha registrado correctamente. Redirigimos a la página principal...";
            $timeout(function(){
                principal.setToken(response.data.token);
                principal.setUsername(response.data.usuario.id);
                $state.go("premios");
            },3000)
            /* principal.setToken(response.data.token);
           
           $state.go('home'); */
           
       },
       function (response) {
           vm.error=response.data;
           //se ha producido un error
          /*  debugger;
           vm.error=reponse.status; */
           //bsLoadingOverlayService.stop();             
           //vm.codigohttp=response.status;
           //vm.loginincorrecto=true;               
           //alert(error);
       }
    ).finally(function(){
        bsLoadingOverlayService.stop();
    });

}


}