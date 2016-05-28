angular.module('homemade')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.itemEdit', {
      url: '/itemEdit/:itemId',
      views: {
        'menuContent': {
          templateUrl: 'app/item/item-edit/item-edit.html',
          controller: 'ItemEditCtrl'
        }
      }
    })
  })
  .controller('ItemEditCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView, saveOverlay, $ionicPopup) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    $scope.batchOpen = false;
    $scope.batch = {};

    const Item = Resource.new("item", {
      'ofSeller': {
        method: 'GET',
        params: {populate: 'seller img'}
      }
    });
    const ItemBatch = Resource.new("itembatch");

    $scope.loadData = function () {
      Item.ofSeller({id: $stateParams.itemId})
        .$promise.then(function (item) {
          $scope.item = item;

        }, function (err) {
          console.error('Response error', err);
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });

      ItemBatch.query({item: $stateParams.itemId, open: true})
        .$promise.then(function (itemBatches) {
          var batches = itemBatches;

          if (batches.length != 0) {
            $scope.batch = batches[0];
            $scope.batchOpen = true;
          }

        }, function (err) {
          console.error('Response error', err);
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.createNewBatch = function () {
      $scope.batch = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: 'Amount: <input type="text" ng-model="batch.amount">' +
                  'Time: <input type="time" ng-model="batch.time">',
        title: 'Enter batch amount and time till it\'s ready (in minutes)',
        scope: $scope,
        buttons: [
          {text: '<div style="font-size: 8px">Cancel</div>'},
          {
            text: '<div style="font-size: 8px">Finish</div>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.batch.amount || !$scope.batch.time) {
                //don't allow the user to close unless he enters the details
                e.preventDefault();
              } else {
                return [];
              }
            }
          },
        ]
      }).then(function () {

          var now = new Date();
          var timeReady = add_minutes(now, $scope.batch.time);

          var batch = {
            beginTime: now,
            item: $scope.item._id,
            itemsCount: $scope.batch.amount,
            itemsLeft: $scope.batch.amount,
            timeReady: timeReady,
            open: true
          }

          ItemBatch.save(batch).$promise
            .then(function (res) {
              $scope.batch = res;
              $scope.batchOpen = true;
            })
            .catch(function (err) {
              console.log(err);
            });
      });
    };

    $scope.closeBatch = function () {
      $scope.batch.open = false;

      ItemBatch.update($scope.batch).$promise.then(function (res) {
        $scope.batch = {};
        $scope.batchOpen = false;
      }
      ,function (err) {
        console.error('Response error', err);
      });
    };

    var add_minutes =  function (dt, dt_minutes) {

      var hours = dt_minutes.getHours()*60;
      var minutes = dt_minutes.getMinutes();
      var allMinutes = hours + minutes;

      return new Date(dt.getTime() + allMinutes*60000);
    }

    var validateItem = function (item) {

      if (!item.name || item.name.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save item',
          template: 'Please enter the name of the item'
        });
        return false;
      }

      if (!item.details || item.details.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save item',
          template: 'Please enter the item details'
        });
        return false;
      }

      if (!item.pricePerItem || item.pricePerItem.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save item',
          template: 'Please enter the item price'
        });
        return false;
      }

      return true;
    };

    $scope.saveItem = function () {
      if (validateItem($scope.item)) {
        saveOverlay.show($scope);

        Item.update($scope.item).$promise
          .then(function (res) {
              return saveOverlay.success();
            },
            function (err) {
              console.error(JSON.stringify(err));
              return saveOverlay.error();
            });
      }
    };

    $scope.loadData();

  });
