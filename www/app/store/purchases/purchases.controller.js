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

    $scope.activeOrders = {'active', 'active', 'active'};
    $scope.doneOrders = {'done', 'done', 'done'};
    $scope.allOrders = {'all', 'all', 'all'};

  });
