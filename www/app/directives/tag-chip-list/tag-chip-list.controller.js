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

        $scope.deleteTag = function(tag) {

          var index = 0;

          for (var i = 0; i < $scope.tags.length; i++) {
            if ($scope.tags[i] === tag){
              index = i;
            }
          }

          $scope.tags.splice(index, index + 1);
        };
      }
    };
  });
