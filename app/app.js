angular.module('LotoApp', ['ui.router', 'LotoApp.principal', 'bsLoadingOverlay', 'bsLoadingOverlaySpinJs', 'ui.bootstrap','ngTouch','ngAnimate']);


angular.module('LotoApp').config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    var path = "modules/";
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise("/404");

    $stateProvider.state('404', {
        url: "/404",
        templateUrl: path + '404/404view.html',
    });

    $stateProvider.state('premios', {
        data: { needautentication: false },
        url: "/premios",
        component: "premios"
        //templateUrl: path + 'login/loginview.html',
    });
    $stateProvider.state('misdecimos', {
        data: { needautentication: false },
        url: "/misdecimos",
        component: "misdecimos"
        //templateUrl: path + 'login/loginview.html',
    });

    $stateProvider.state('adminmisdecimos', {
        data: { needautentication: true },
        url: "/misdecimos/admin",
        component: "adminmisdecimos"
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
        data: { needautentication: false },
        url: "/",
        component: "home"
    });

}]);

angular.module('LotoApp').run(["$transitions", "$state", "$log", "principal", "bsLoadingOverlayService", "$timeout", "$rootScope","$http",function ($transitions, $state, $log, principal, bsLoadingOverlayService, $timeout,$rootScope,$http) {
    console.log("arrancada la aplicación");

    $log.debug("Arranque");
    $rootScope.$watch(function(){
        return $http.pendingRequests.length;
    },function(){
        if($http.pendingRequests.length){
            bsLoadingOverlayService.start();
        }else{
            bsLoadingOverlayService.stop();
        }
    })
    //configuramos el spinner
    bsLoadingOverlayService.setGlobalConfig({
        delay: 500, // Minimal delay to hide loading overlay in ms.
        activeClass: "loading", // Class that is added to the element where bs-loading-overlay is applied when the overlay is active.
        templateUrl: "bsLoadingOverlaySpinJs",
        templateOptions: {
            radius: 14,
            width: 3,
            length: 8,
            //lines: 5,
            color: '#ff9933',
            position: 'absolute'
        }//undefined // Options that are passed to overlay template (specified by templateUrl option above).
    });

    /* bsLoadingOverlayService.start();
    $timeout(function () {
        bsLoadingOverlayService.stop();
    }, 300); */

    $transitions.onSuccess({ to: "premios" }, function (transition) {
        if (!principal.isAuthenticated()) {
            return transition.router.stateService.go('login');
        } else {
            console.log(
                "Successful Transition from " + transition.from().name +
                " to " + transition.to().name
            );
        }

    });
    
    if (!principal.isAuthenticated()) {
       
         $state.go("home");
    } else {

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
