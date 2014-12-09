'use strict';

/* Controllers */

angular
  .module('PizzaControllers', [])
  .controller('PizzaListCtrl', ['$scope', 'Pizza', function($scope, Pizza) {

    $scope.pizzas = Pizza.query();

    $scope.orderProp = 'name';

    $scope.panier=[];

    $scope.order={};

    $scope.addPizza=function(pizza,comment){
      var local=$scope.$new(true);
      console.log(pizza);
      console.log(comment);
      local.pizza=angular.fromJson(pizza);
      $scope.panier=$scope.panier.concat(local.pizza);
      console.log($scope.panier);
    }

    $scope.removePizza=function(index){
      console.log(index);
      $scope.panier.splice(index,1);
      console.log($scope.panier);
    }

    $scope.placeOrder=function(table){
      $scope.order.table=table;//$scope.order.concat([{table:table}]);
      $scope.order.panier=$scope.panier;//$scope.order.concat($scope.panier);
      $scope.order=angular.toJson($scope.order)
      console.log("commande:",$scope.order);
      $scope.panier=[];
      $scope.order=[];
    }
  }])
  .controller('PizzaDetailCtrl', ['$scope', '$routeParams', 'Pizza', function($scope, $routeParams, Pizza) {

    $scope.pizza = Pizza.get({pizzaId: $routeParams.pizzaId}, function(pizza) {
      $scope.mainImg = pizza.img;
    });

    $scope.setImage = function(img) {
      $scope.mainImg = img;
    }
  }]);

