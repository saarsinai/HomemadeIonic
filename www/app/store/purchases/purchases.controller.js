angular.module('homemade')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.purchases', {
      url: '/store/purchases/:sellerId',
      views: {
        'menuContent': {
          templateUrl: 'app/store/purchases/purchases.html',
          controller: 'PurchasesCtrl'
        }
      }
    })
  })
  .controller('PurchasesCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    const Purchase = Resource.new("purchase", {
      'getWithItem': {
        method: 'GET',
        params: {sort: '-time', populate: 'item buyer'}, isArray: true}
    });

    $scope.getStorePurchases = function() {
      Purchase.getWithItem({seller: $stateParams.sellerId}).$promise
        .then(function(purchases) {

          $scope.allSellerPurchases = purchases;

          // Filter only active purchases
          $scope.activePurchases =
            $scope.allSellerPurchases.filter( function(purchase){return (purchase.isActive);} );

          // Filter only done purchases
          $scope.donePurchases =
            $scope.allSellerPurchases.filter( function(purchase){return (!purchase.isActive);} );

        }
        ,function(err) {
          console.error('Response error', err);
        });
    };

    $scope.finishPurchase = function(purchaseToUpdate) {
      purchaseToUpdate.isActive = false;
      Purchase.update(purchaseToUpdate)
        .$promise.then(function ()
        {
          console.log("Purchase Done!");
          $scope.getStorePurchases();
        })
        .catch(logError);
    }

    $scope.getStorePurchases();

  });
