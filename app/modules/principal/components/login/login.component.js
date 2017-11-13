angular.module("LotoApp.principal").component("login", {
    bindings: {	        
    },
    controller: ["$state", "backoffice", "principal",loginController],
    controllerAs: "vm",
    templateUrl:'/modules/principal//components/login/login.tpl.html'
});

function loginController($state, backoffice, principal) {
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
    //bsLoadingOverlayService.start();
    backoffice.sendLogin(vm.usuario, vm.password).then(
       function (response) {
           debugger;
           principal.setToken(response.data.token);
           //alert(JSON.stringify(data));
           //bsLoadingOverlayService.stop();
           //principal.authenticate({ Nombre: data.usuario, Password: data.password, AuthToken: data.token, Roles: ["Administrador", "User"] });
           $state.go('home');
           
       },
       function (response) {
           //bsLoadingOverlayService.stop();             
           vm.codigohttp=response.status;
           vm.loginincorrecto=true;               
           //alert(error);
       }
    );

}


}