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
  .controller('itemController', ['$scope', '$stateParams', 'Resource', 'Authorization', '$ionicPopup', '$state', 'Authorization',
    function ($scope, $stateParams, Resource, Authorization, $ionicPopup, $state, Authorization) {

      $scope.showPopup = function () {
        $scope.purchase = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="purchase.amount">',
          title: 'Enter order amount',
          scope: $scope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Finish</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$scope.purchase.amount) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  return $scope.purchase.amount;
                }
              }
            },
          ]
        });
        myPopup.then(function (res) {
          if (res && res > 0) {

            const Purchase = Resource.new('purchase');
            const Batch = Resource.new('itemBatch');
            Batch.query({item: $scope.item._id}).$promise
              .then(function (batch) {
                $scope.batch = batch.filter(function(x){
                  return x.open;
                })[0];
                var purchase = {
                  item: $scope.item._id,
                  batch: $scope.batch._id,
                  buyer: Authorization.getUser()._id,
                  time: Date.now(),
                  numOfItems: Number(res),
                  price: res * $scope.item.pricePerItem

                };
                Purchase.save(purchase).$promise.then(function (res) {
                  $scope.purchase = res;

                  $state.go('app.orderItem', {purchaseId: $scope.purchase._id});
                });
              });

          }
        });

      };

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
