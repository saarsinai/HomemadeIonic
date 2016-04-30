angular.module('homemade')
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

          var newRating = $scope.item.likes + 1;
          $scope.item.likes += 1;
          $scope.item.$update().then(function(){
            $scope.item.likes = newRating;
          });
        }
      }
    };

    function link(scope, element, attrs) {

    }
  });
