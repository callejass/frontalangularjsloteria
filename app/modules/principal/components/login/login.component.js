angular.module("LotoApp.principal").component("login", {
    bindings: {	        
    },
    controller: ["$state", "backoffice", "principal","bsLoadingOverlayService",loginController],
    controllerAs: "vm",
    templateUrl:'/modules/principal/components/login/login.tpl.html'
});

function loginController($state, backoffice, principal,bsLoadingOverlayService) {
var vm = this;
angular.extend(vm, {
    usuario: '',
    password: '',
    dologin: dologin,
    setLocale:setLocale,
    locale:'es',
    codigohttp:''
});

function setLocale(loc){
    //alert($translate.get)
    $translate.use(loc);
}
function dologin() {        
    bsLoadingOverlayService.start();
    backoffice.sendLogin(vm.usuario, vm.password).then(
       function (response) {
        
           principal.setToken(response.data.token);
           principal.setUsername(vm.usuario);
           //alert(JSON.stringify(data));
           //bsLoadingOverlayService.stop();
           //principal.authenticate({ Nombre: data.usuario, Password: data.password, AuthToken: data.token, Roles: ["Administrador", "User"] });
           $state.go('premios');
           
       },
       function (response) {
           //bsLoadingOverlayService.stop();             
           vm.codigohttp=response.status;
           vm.loginincorrecto=true;               
           //alert(error);
       }
    
    ).finally(function(){
        bsLoadingOverlayService.stop();
    });

}


}