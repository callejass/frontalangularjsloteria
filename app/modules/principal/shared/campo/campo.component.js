angular.module("LotoApp.principal").component("campoFormulario", {
    bindings: {
        label: "@",
        labelcols: "@",
        name: '@',
        type: '@',
        integer:"<",
        required: '<',
        help: "@",
        max: "@",
        min: "@",
        regex: "@",
        maxlength: "@",
        minlength: "@",
        disabled: '='
    },
    require: {
        ngModel: '^ngModel',
        form: '^^form'
    },
    controller: ["$log", "$scope", "$filter", agvCampoFormularioController],
    controllerAs: "vm",
    templateUrl: "/modules/principal/shared/campo/campo.tpl.html"
});


function agvCampoFormularioController($log, $scope, $filter) {
    var vm = this;
    angular.extend(vm, {
        $onInit: init,
        $onChanges: onChanges,        
        value: '',
        data: {
            cols: {
                label: 3,
                text: 9
            }
        },
        model: {},
        openDatePopup: openDatePopup,
        datepopupopened: false,
        dateOptions: {
            showWeeks: false
        },
        internalchange:internalchange

    });
    function init() {

        vm.required=!!vm.required;

        vm.ngModel.$render = function () {
            vm.value = vm.ngModel.$viewValue;
        };


        if (vm.type === "number") {
            vm.ngModel.$parsers.push(function(value){
                $log.debug("en el parseador personalizado: " + value);
                return 1*value;
            });
        }
        if (vm.type == "text") {
            
        }

        if (vm.type == "number" && vm.max) {
            //añado el validador               
            vm.ngModel.$validators.maximo = function (modelValue) {
                $log.debug("Validando si " + modelValue + " es menor de " + vm.max);
                return modelValue ? modelValue <= vm.max : true;
            }
        }

        if(vm.type=="number" && vm.integer){
            vm.ngModel.$validators.integer=function(modelValue){
                return modelValue ? Number.isInteger(modelValue) :true
            }
        }
        if (vm.type == "number" && vm.min) {
            //añado el validador 
            vm.ngModel.$validators.minimo = function (modelValue) {
                return modelValue? modelValue >= vm.min : true;
            }
        }        
        if (vm.regex) {
            vm.ngModel.$validators.regex = function (modelValue) {
                if (modelvalue) {
                    var r = new RegExp(vm.regex);
                    var valido = r.test(vm.value);
                    return valido;                    
                } else {
                    return true;                    
                }                
            }            
        }
        //alert(vm.name);     
        $log.debug("Campo " + vm.label + " Es requerido:" + vm.required);
        //vm.required = vm.required !== undefined ? true : false;

        /*vm.ngModel.$render = function () {
            vm.value = vm.ngModel.$viewValue;
        };*/

        vm.ngModel.$parse
        /*$scope.$watch('vm.value', function (value) {          
            vm.ngModel.$setViewValue(value);            
        });                        */
    }
    function internalchange(){
        $log.debug("Pasando " + vm.value + " al ngModel");
        vm.ngModel.$setViewValue(vm.value);        
        //$log.debug();
    }




    function formateadorMayusculas(value) {
        if (value) {
            return value.toUpperCase();
        }
    }
    function formateadorNumerico(value) {
        if (value) {
            return $filter("number")(value);
        }
    }

    function validadormaxlength() {
        var valido = vm.value.length == 0 || vm.value.length <= vm.maxlength;
        vm.ngModel.$setValidity("maxlength", valido);
        vm.form[vm.name].$setValidity("maxlength", valido);
        return vm.value;
    }
    function validadorminlength() {
        var valido = vm.value.length == 0 || vm.value.length >= vm.minlength;
        vm.ngModel.$setValidity("minlength", valido);
        vm.form[vm.name].$setValidity("minlength", valido);
        return vm.value;
    }
    function validadorexpresionregular() {
        if (vm.value != '') {
            var r = new RegExp(vm.regex);
            var valido = r.test(vm.value);
            vm.ngModel.$setValidity("regex", valido);
            vm.form[vm.name].$setValidity("regex", valido);
        } else {
            vm.ngModel.$setValidity("regex", true);
            vm.form[vm.name].$setValidity("regex", true);
        }
        return vm.value;
    }
    function validadormin() {
        var actual = parseInt(vm.value, 10);
        var min = parseInt(vm.min, 10);
        //$log.debug("validando min...(" + vm.value + ">=" + min + ")");
        if (vm.value != '' || vm.value == 0) {
            var valido = (actual >= min);
            //$log.debug("validando min...(" + actual + ">=" + min + ")=" + valido);
            vm.ngModel.$setValidity("minimo", valido);
            vm.form[vm.name].$setValidity("minimo", valido);
        } else {

            vm.ngModel.$setValidity("minimo", true);
            vm.form[vm.name].$setValidity("minimo", true);


        }

        return vm.value;
    }
    function validadormax() {

        var valido = vm.value != '' ? vm.value <= vm.max : true;
        //$log.debug("validando max...(" + vm.value + "," + vm.max + ")=" + valido);
        vm.ngModel.$setValidity("maximo", valido);
        vm.form[vm.name].$setValidity("maximo", valido);
        return vm.value;
    }
    function openDatePopup() {
        $log.debug("Abrimos el datepicker...");
        vm.datepopupopened = true;
    }
    function onChanges() {
        //$log.info("En el onchanges del labeltext");        
    }
}




