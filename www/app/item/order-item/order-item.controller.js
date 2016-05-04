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
  .controller('OrderItemCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
    selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
    selector: '.animate-fade-slide-in .item'
    });
  });
