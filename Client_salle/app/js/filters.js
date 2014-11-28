'use strict';

/* Filters */

angular.module('PizzaFilters', [])

  .filter('betterNote', function() {
    return function(note) {
      return (note < 8) ? note+' \u2713' : note+' \u2718';
    };
});
