angular.module("LotoApp.principal").component("login", {
    bindings: {	        
    },
    controller: ["$state", "backoffice", "principal","uiservice",loginController],
    controllerAs: "vm",
    templateUrl:'/modules/principal/components/login/login.tpl.html'
});

function loginController($state, backoffice, principal,uiservice) {
var vm = this;
angular.extend(vm, {
    usuario: '',
    password: '',
    dologin: dologin,
});


function dologin() {        
    
    backoffice.sendLogin(vm.usuario, vm.password).then(
       function (response) {
        
           principal.setToken(response.data.token);
           principal.setUsername(vm.usuario);
           //alert(JSON.stringify(data));
           //bsLoadingOverlayService.stop();
           //principal.authenticate({ Nombre: data.usuario, Password: data.password, AuthToken: data.token, Roles: ["Administrador", "User"] });
           $state.go('home');
           
       },
       function (response) {
           uiservice.showError("Login incorrecto");
           //bsLoadingOverlayService.stop();             
           
             
           //alert(error);
       }
    
    ).finally(function(){
        //bsLoadingOverlayService.stop();
    });

}


}