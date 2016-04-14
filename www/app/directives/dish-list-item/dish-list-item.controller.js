angular.module('starter')
  .directive('hmdDishListItem', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/dish-list-item/dish-list-item.html',
      scope: {
        name: '@'
      }
    };
  });
