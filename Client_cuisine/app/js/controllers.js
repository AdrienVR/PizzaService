'use strict';

/* Controllers */

angular
  .module('PizzaControllers', ['ngResource'])
  .controller('PizzaListCtrl', ['$resource', '$http', '$scope', 'Pizza', function($resource, $http, $scope, Pizza) {

   // $scope.pizzas = Pizza.query();
    console.log(JSON.stringify(Pizza.query()));
    var testPizza = $http.get('pizzas/pizzas.json')
                    .success(function(data, status){
                        $scope.pizzas = data;
                        console.log(JSON.stringify(data));

                    })
                    .error(function(data, status) {
                        console.log("Error : "+status+" - Data:"+data);
                        alert(data);
                    });
   // console.log(JSON.stringify($scope.pizzas));
 //var gg=$scope.pizzas.
    //$scope.pizzo = Pizza.query();
    //var log=[];
    //angular.forEach($scope.pizzas, function(value, key){
    //this.push(key+':'+value);},log);
  //  console.log(Object.keys($scope.pizzas));
    //console.log(log);
     $scope.nextPizza=function(){

        $scope.pizzas.splice(0,1);
        console.log("\n oh yeah usher\n"+JSON.stringify( $scope.pizzas));
        //changer le statut de la commande
       }


  }])
 /* .controller('PizzaDetailCtrl', ['$scope', '$routeParams', 'Pizza', function($scope, $routeParams, Pizza) {

    $scope.pizza = Pizza.get({pizzaId: $routeParams.pizzaId}, function(pizza) {
      $scope.mainImg = pizza.img;
    });

    $scope.setImage = function(img) {
      $scope.mainImg = img;
    }
  }]);*/

