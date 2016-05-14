angular.module('homemade')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.orderItem', {
      url: '/item/orderItem?purchaseId',
      views: {
        'menuContent': {
          templateUrl: 'app/item/order-item/order-item.html',
          controller: 'OrderItemCtrl'
        }
      }
    })
  })
  .controller('OrderItemCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView, $ionicHistory) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);
    const Purchase = Resource.new('purchase', {
      'withPopulate': {
        method: 'GET',
        params: {populate: 'item buyer'}
      }
    });

    Purchase.withPopulate({id: $stateParams.purchaseId}).$promise
      .then(function (purchase) {
        $scope.purchase = purchase;
        $timeout(function(){
          $ionicHistory.goBack();
        }, 3000)
      });
  });
