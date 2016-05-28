angular.module('homemade')
  .directive('hmdUserItemPurchase', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/user-item-purchase/user-item-purchase.html',
      link: link,
      scope: {
        purchase: '='
      },
      controller: function ($scope, ionicMaterialInk, ionicMaterialMotion) {
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
          selector: '.push-down'
        });

        // Get batch end time
        $scope.isReady = false;
        $scope.endTime = $scope.purchase.batch.timeReady;
        if(Date.parse($scope.purchase.batch.timeReady)-Date.parse(new Date())<0)
        {
          $scope.isReady = true;
        }
      }
    };

    function link(scope, element, attrs) {

    }
  });
