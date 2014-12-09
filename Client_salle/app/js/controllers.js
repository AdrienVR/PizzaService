'use strict';

/* Controllers */

angular
  .module('PizzaControllers', [])
  .controller('PizzaListCtrl', ['$scope', 'Pizza', function($scope, Pizza) {

    $scope.pizzas = Pizza.query();

    $scope.orderProp = 'note';

    $scope.panier=[];

    //$scope.index=0;

    $scope.addPizza=function(pizza,comment,number){
      var local=$scope.$new(true);
      console.log(pizza);
      console.log(comment);
      //pizza.comment=comment;
      local.pizza=angular.fromJson(pizza);

      //local.pizza=local.pizza.concat(pizza);
      //local.pizza.comment=comment;
      $scope.panier=$scope.panier.concat(local.pizza);
      console.log($scope.panier);
    }

    /*$scope.removePizza=function(pizza){
      $scope.panier.pop()
      console.log($scope.panier);
    }*/
  }])
  .controller('PizzaDetailCtrl', ['$scope', '$routeParams', 'Pizza', function($scope, $routeParams, Pizza) {

    $scope.pizza = Pizza.get({pizzaId: $routeParams.pizzaId}, function(pizza) {
      $scope.mainImg = pizza.img;
    });

    $scope.setImage = function(img) {
      $scope.mainImg = img;
    }
  }]);

