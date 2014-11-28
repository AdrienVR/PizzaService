'use strict';

/* App Module */

var angularPizza = angular.module('AngularPizza', [
  'ngRoute',
  'PizzaControllers',
  'PizzaFilters',
  'PizzaServices',
  'PizzaDirectives'
]);

angularPizza.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/pizzas', {
        templateUrl: 'partials/pizza-list.html',
        controller: 'PizzaListCtrl'
      }).
      when('/pizzas/:pizzaId', {
        templateUrl: 'partials/pizza-detail.html',
        controller: 'PizzaDetailCtrl'
      }).
      otherwise({
        redirectTo: '/pizzas'
      });
  }]);