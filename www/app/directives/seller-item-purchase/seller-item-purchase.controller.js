angular.module('homemade')
  .directive('hmdSellerItemPurchase', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/seller-item-purchase/seller-item-purchase.html',
      scope: {
        purchase: '=',
        done: '&'
      },
      controller: function ($scope, ionicMaterialInk, ionicMaterialMotion, Resource) {

      }
    }
  });
