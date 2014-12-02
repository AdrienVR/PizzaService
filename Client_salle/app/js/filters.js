'use strict';

/* Filters */

angular.module('PizzaFilters', [])

  .filter('betterNote', function() {
    return function(note) {
      return (note < 3) ? note+' \u2713' : note+' \u2718';
    };
});
