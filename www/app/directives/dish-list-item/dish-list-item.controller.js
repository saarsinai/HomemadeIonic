angular.module('starter')
  .directive('hmdDishListItem', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/dish-list-item/dish-list-item.html',
      link: link,
      scope: {
        item: '='
      },
      controller: function($scope, ionicMaterialInk, ionicMaterialMotion){
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
          selector: '.push-down'
        });

        $scope.like = function () {

          $scope.item.rating++;
          $scope.item.$update();
        }
      }
    };

    function link(scope, element, attrs) {

    }
  });
