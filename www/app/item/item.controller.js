angular.module('homemade')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.item', {
      url: '/item/:itemId',
      views: {
        'menuContent': {
          templateUrl: 'app/item/item.html',
          controller: 'itemController'
        }
      }
    })
  })
  .controller('itemController', ['$scope', '$stateParams', 'Resource', 'Authorization', function ($scope, $stateParams, Resource, Authorization) {

    const Item = Resource.new("item", {
      'ofSeller': {
        method: 'GET',
        params: {populate: 'seller img'}
      }
    });
    const userId = Authorization.getUser()._id;

    var getItemById = function () {
      Item.ofSeller({id: $stateParams.itemId})
        .$promise.then(function (item) {

          $scope.item = item;
          if ($scope.item.likes.filter(function (currUser) {
              return currUser === userId;
            }).length) {
            $scope.LikeTitle = "Dislike";
          } else {
            $scope.LikeTitle = "like";
          }
        }
        , function (err) {
          console.error('Response error', err);
        });
    };


    $scope.likeItem = function () {

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


    getItemById();

  }]);
