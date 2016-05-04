angular.module('homemade')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.orderItem', {
      url: '/item/orderItem?itemId',
      views: {
        'menuContent': {
          templateUrl: 'app/item/order-item/order-item.html',
          controller: 'OrderItemCtrl'
        }
      }
    })
  })
  .controller('OrderItemCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);
  });
