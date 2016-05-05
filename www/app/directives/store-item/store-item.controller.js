angular.module('homemade')
  .directive('hmdStoreItem', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/store-item/store-item.html',
      scope: {
        item: '='
      }
    };
  });
