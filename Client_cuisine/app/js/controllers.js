'use strict';

/* Controllers */

angular
  .module('PizzaControllers', [])
  .controller('PizzaListCtrl', ['$scope', 'Pizza', function($scope, Pizza) {

    $scope.pizzas = Pizza.query();
 //var gg=$scope.pizzas.
    //$scope.pizzo = Pizza.query();
    //var log=[];
    //angular.forEach($scope.pizzas, function(value, key){
    //this.push(key+':'+value);},log);
    console.log(Object.keys($scope.pizzas));
    //console.log(log);
     $scope.nextPizza=function(){
        $scope.pizzas.splice(0,1);
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

