angular.module('homemade')
  .directive('hmdTagChipList', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/tag-chip-list/tag-chip-list.html',
      scope: {
        tags: '='
      },
      controller: function ($scope, $filter, Authorization, ionicMaterialInk, ionicMaterialMotion) {
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
          selector: '.push-down'
        });
      }
    };
  });
