angular.module('homemade')
  .factory('initIonicView', function () {
    return function($scope, ionicMaterialInk, ionicMaterialMotion){
      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab(false);

      // Activate ink for controller
      ionicMaterialInk.displayEffect();

      ionicMaterialMotion.pushDown({
        selector: '.push-down'
      });
      ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
      });
    }
  });
