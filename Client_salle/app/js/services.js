'use strict';

/* Services */

angular.module('PizzaServices', ['ngResource'])
  .factory('Pizza', ['$resource',
    function($resource){
      return $resource('pizzas/:pizzaId.json', {}, {
        query: {method:'GET', params:{pizzaId:'pizzas'}, isArray:true}
      });
    }]);
