'use strict';

/* Directives */

angular
  .module('PizzaDirectives', [])
  .directive('pizza', [function(){
    return {
      scope: {
        pizza: '=pizza'
      },
      template: "<a href='#/pizzas/{{pizza.id}}' class='thumb'><img ng-src='{{pizza.img}}'></a>"
                +"<a href='#/pizzas/{{pizza.id}}'>{{pizza.name}}</a>"
                +"<p>{{pizza.description}}</p>",
      link: function(scope, element, attributes, controller) {
        
      }
    };
  }]);;