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

          var newRating = $scope.item.rating + 1;
          $scope.item.rating += 1;
          $scope.item.$update().then(function(){
            $scope.item.rating = newRating;
          });
        }
      }
    };

    function link(scope, element, attrs) {

    }
  });
