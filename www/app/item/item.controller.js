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
  .controller('itemController', ['$scope', '$stateParams', 'Resource', 'Authorization', '$ionicPopup', '$state', '$q', 'loadingBackdrop',
    function ($scope, $stateParams, Resource, Authorization, $ionicPopup, $state, $q, loadingBackdrop) {

      const Item = Resource.new("item", {
        'ofSeller': {
          method: 'GET',
          params: {populate: 'seller img'}
        }
      });
      const ItemBatch = Resource.new("itembatch");
      const userId = Authorization.getUser()._id;

      $scope.batchOpen = false;
      $scope.isReady = false;

      $scope.loadDataFromServer = function () {
        var itemPromise = Item.ofSeller({id: $stateParams.itemId}).$promise;
        var batchPromise = ItemBatch.query({item: $stateParams.itemId, open: true}).$promise;
        return $q.all([itemPromise, batchPromise]);
      };

      $scope.loadData = function () {
        $scope.$broadcast('scroll.refreshComplete');
        loadingBackdrop($scope.loadDataFromServer)
          .then(function (data) {
            $scope.item = data[0];
            if ($scope.item.likes.filter(function (currUser) {
                return currUser === userId;
              }).length) {
              $scope.LikeTitle = "dislike";
            } else {
              $scope.LikeTitle = "like";
            }

            var batches = data[1];
            if (batches.length != 0) {
              $scope.batch = batches[0];
              $scope.batchOpen = true;

              $scope.endTime = $scope.batch.timeReady;
              if(Date.parse($scope.batch.timeReady)-Date.parse(new Date())<0) {
                $scope.isReady = true;
              }
            } else {
              $scope.batch = null;
              $scope.batchOpen = false;
            }
          })
          .catch(function (err) {
            console.error('Response error', err);
          });
      };

      $scope.loadData();

      $scope.showPopup = function () {
        $scope.purchase = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="purchase.amount">',
          title: 'Enter order amount',
          scope: $scope,
          buttons: [
            {text: '<div style="font-size: 8px">Cancel</div>'},
            {
              text: '<div style="font-size: 8px">Finish</div>',
              type: 'button-positive',
              onTap: function (e) {
                var amountAsInt = Number.parseInt($scope.purchase.amount);
                if (Number.isInteger(amountAsInt)) {
                  return $scope.purchase.amount;
                } else {
                  //don't allow the user to close unless he enters amount
                  $ionicPopup.alert({
                    title: 'Incorrect amount!',
                    template: 'please check you entered numbers only.'
                  });
                  e.preventDefault();
                }
              }
            },
          ]
        });
        myPopup.then(function (res) {
          if (res && res > 0) {

            const Purchase = Resource.new('purchase');
            const Batch = Resource.new('itemBatch');
            Batch.query({item: $scope.item._id, open: true}).$promise
              .then(function (batch) {
                $scope.batch = batch[0];
                var purchase = {
                  item: $scope.item._id,
                  seller: $scope.item.seller._id,
                  batch: $scope.batch._id,
                  buyer: Authorization.getUser()._id,
                  time: Date.now(),
                  numOfItems: Number(res),
                  price: res * $scope.item.pricePerItem,
                  isActive: true
                };
                return Purchase.save(purchase).$promise
              })
              .then(function (res) {
                $scope.purchase = res;
                $state.go('app.itemOrdered', {purchaseId: $scope.purchase._id});
              });
          }
        });
      };

      var add_minutes =  function (dt, minutes) {
        return new Date(dt.getTime() + minutes*60000);
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
    }]);
