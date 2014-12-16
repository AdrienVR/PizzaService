'use strict';

/* Controllers */

angular
  .module('PizzaControllers', [])
  .controller('PizzaListCtrl', ['$scope', '$http', 'Pizza', '$log', function($scope,$http,Pizza, $log) {

    $scope.pizzas = Pizza.query();
    $scope.orderProp = 'name';
    $scope.panier=[];
    $scope.order={};
    $scope.statut="";
    $scope.isDisabled=true;

    $scope.addPizza=function(pizza){//,comment){
      $scope.statut="";
      $scope.panier=$scope.panier.concat(angular.fromJson(pizza));
      console.log($scope.panier);
    }

    $scope.removePizza=function(index){
      console.log(index);
      $scope.panier.splice(index,1);
      console.log($scope.panier);
    }

    $scope.changement=function(){
      if($scope.panier.length!=0){
        $scope.isDisabled=false;
      }
    }

    $scope.placeOrder=function(table){
      $scope.isDisabled=true;
      $scope.value="";
      $scope.order.table=table;
      $scope.order.panier=$scope.panier;
      $scope.order=angular.toJson($scope.order);
      console.log("commande:",$scope.order);
      console.log("should it be disabled:",$scope.isDisabled);
      $http.get('http://localhost:8001/addingOrder?json='+$scope.order).
          success(function(data, status, headers, config){
            $scope.statut="commande passée"
            console.log("c'est cool !");
          }).
          error(function(data, status, headers, config){
            $scope.statut="commande passée"
            console.log("caca");
          });
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

