'use strict';

/* App Module */

var angularPizza = angular.module('AngularPizza', [
  'ngRoute',
  'PizzaControllers',
  'PizzaFilters',
  'PizzaServices',
  'PizzaAnimations'
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


WebFontConfig = {
    google: { families: [ 'Source+Sans+Pro:300,400,600:latin,latin-ext' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();