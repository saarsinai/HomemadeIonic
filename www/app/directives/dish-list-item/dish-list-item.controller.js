angular.module('homemade')
  .directive('hmdDishListItem', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/dish-list-item/dish-list-item.html',
      link: link,
      scope: {
        item: '='
      },
      controller: function ($scope, ionicMaterialInk, ionicMaterialMotion, Resource) {
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
          selector: '.push-down'
        });

        const Item = Resource.new("item");

        $scope.item = new Item($scope.item);

        $scope.like = function () {
          var newRating = $scope.item.likes + 1;
          $scope.item.likes += 1;
          Item.update($scope.item).$promise
            .then(function () {
              $scope.item.likes = newRating;
            })
            .catch(function (err) {
              console.error(JSON.stringify(err));
            });
        }
      }
    };

    function link(scope, element, attrs) {

    }
  });
