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
      controller: function ($scope, $filter, Authorization, ionicMaterialInk, ionicMaterialMotion, Resource) {
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
          selector: '.push-down'
        });

        const Item = Resource.new("item");

        $scope.item = new Item($scope.item);


        $scope.like = function () {
          var userId = Authorization.getUser()._id;

          var UserLikedItem = $scope.item.likes.filter(function (currUser) {
            return currUser === userId;
          });

          // checks if not liked this item before
          if (UserLikedItem.length) {
            $scope.item.likes = $scope.item.likes.filter(function (currUser) {
              return currUser !== userId;
            });
            $scope.LikeTitle = "Like";
          } else {
            $scope.item.likes.push(userId);
            $scope.LikeTitle = "Dislike";
          }
          Item.update($scope.item).$promise
            .catch(function (err) {
              console.error(JSON.stringify(err));
            });
        };
      }
    };

    function link(scope, element, attrs) {

    }
  });
