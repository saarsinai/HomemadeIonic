angular.module('starter')
  .directive('hmdDishListItem', function() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/directives/dish-list-item/dish-list-item.html',
      scope: {
        name: '@'
      }
    };
  });
