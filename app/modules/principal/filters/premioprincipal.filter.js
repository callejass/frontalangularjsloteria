angular.module("LotoApp.principal").filter("premioprincipal",function(){

        return function(numero){
            if (isFinite(numero) && numero>=0){
                var pad="00000";
                return padLeft(numero,5)
                //return   pad.substring(0,5-numero.length) + numero;
               // return  numero;
            }else{
                return "-----";
            }
        }

        function padLeft(nr, n, str){
            return Array(n-String(nr).length+1).join(str||'0')+nr;
        }
});