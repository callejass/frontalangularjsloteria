angular.module('LotoApp', ['ui.router','LotoApp.principal']);


angular.module('LotoApp').config(["$stateProvider","$urlRouterProvider",function ($stateProvider, $urlRouterProvider) {

    var path = "modules/";
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise("/404");

    $stateProvider.state('404', {
        url: "/404",
        templateUrl: path + '404/404view.html',
    });

    $stateProvider.state('premios', {
        data:{ needautentication:true },
        url: "/premios",
        component: "premios"
        //templateUrl: path + 'login/loginview.html',
    });
    $stateProvider.state('misdecimos', {
        data:{needautentication:true},
        url: "/misdecimos",
        component: "misdecimos"
        //templateUrl: path + 'login/loginview.html',
    });

    $stateProvider.state('misdecimosadmin', {
        data:{needautentication:true},
        url: "/misdecimos/admin",
        component: "misdecimosadmin"
        //templateUrl: path + 'login/loginview.html',
    });
    $stateProvider.state('login', {
        url: "/login",
        component: "login"
        //templateUrl: path + 'login/loginview.html',
    });
    $stateProvider.state('registro', {
        url: "/registro",
        component: "registro"
        //templateUrl: path + 'login/loginview.html',
    });

    $stateProvider.state('home', {
        data:{needautentication:true},
        url: "/",
        component: "home"
    });
    
}]);

angular.module('LotoApp').run(["$transitions","$state","$log","principal",function ($transitions,$state,$log,principal) {
    console.log("arrancada la aplicación");
    debugger;
    $log.debug("Arranque");
    $transitions.onSuccess({to:"premios"}, function(transition) {
        if(!principal.isAuthenticated()){
            return transition.router.stateService.go('login');
        }else{
            console.log(
                "Successful Transition from " + transition.from().name +
                " to " + transition.to().name
            );
        }
        
    });
    if(principal.isAuthenticated()){
        $state.go("premios");
    }else{
        $state.go("home");
    }
    /* $rootScope.$on("$stateChangeStart", function (e, to) {
        $log.debug("Cambio de estado a " + to);
        if (to.data && to.data.needautentication) {
            principal.identity(true).then(function () {
                if (!principal.isAuthenticated()) {
                    e.preventDefault();
                    $state.go("login");
                }
            });            
        }
    });  */      
}]);
