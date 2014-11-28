'use strict';

/* Controllers */

angular
  .module('PizzaControllers', [])
  .controller('PizzaListCtrl', ['$scope', 'Pizza', function($scope, Pizza) {

    $scope.pizzas = Pizza.query();

    $scope.orderProp = 'alcohol';
  }])
  .controller('PizzaDetailCtrl', ['$scope', '$routeParams', 'Pizza', function($scope, $routeParams, Pizza) {

    $scope.pizza = Pizza.get({pizzaId: $routeParams.pizzaId}, function(pizza) {
      $scope.mainImg = pizza.img;
    });

    $scope.setImage = function(img) {
      $scope.mainImg = img;
    }
  }]);

