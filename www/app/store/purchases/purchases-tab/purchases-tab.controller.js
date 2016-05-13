angular.module('homemade')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider
      .state('app.purchases.allPurchases', {
        url: '/purchases/allPurchases/:sellerId',
        views: {
          'all': {
            templateUrl: 'app/store/purchases/purchases-tab/purchases-tab.html',
            controller: 'PurchasesTabCtrl'
          }
        },
        data: {
          showActive: true,
          showDone: true
        }
      })
      .state('app.purchases.activePurchases', {
        url: '/purchases/activePurchases/:sellerId',
        views: {
          'active': {
            templateUrl: 'app/store/purchases/purchases-tab/purchases-tab.html',
            controller: 'PurchasesTabCtrl'
          }
        },
        data: {
          showActive: true,
          showDone: false
        }
      })
      .state('app.purchases.donePurchases', {
        url: '/purchases/donePurchases/:sellerId',
        views: {
          'done': {
            templateUrl: 'app/store/purchases/purchases-tab/purchases-tab.html',
            controller: 'PurchasesTabCtrl'
          }
        },
        data: {
          showActive: false,
          showDone: true
        }
      })
  })
  .controller('PurchasesTabCtrl', function ($scope, $stateParams, $state, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    const Purchase = Resource.new("purchase", {
      'getWithItem': {
        method: 'GET',
        params: {sort: '-time', populate: 'item buyer'}, isArray: true
      }
    });


    var params = {seller: $stateParams.sellerId};

    var showActive = $state.current.data.showActive;
    var showDone = $state.current.data.showDone;

    if (!(showActive && showDone)) {
      if (showActive) {
        params.isActive = true;
      } else if (showDone) {
        params.isActive = false;
      }
    }

    $scope.loadData = function () {
      Purchase.getWithItem(params).$promise
        .then(function (purchases) {
          $scope.purchases = purchases
        }, function (err) {
          console.errorJson(err);
        });
    };

    $scope.finishPurchase = function (purchaseToUpdate) {
      purchaseToUpdate.isActive = false;
      Purchase.update(purchaseToUpdate).$promise
        .then(function () {
          console.log("Purchase Done!");
          $scope.loadData();
        })
        .catch(logError);
    };

    $scope.loadData();
  });
