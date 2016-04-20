angular.module('starter')
  .controller('GalleryCtrl', function ($scope, $stateParams, Resource, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    const Item = Resource.new("item");

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    $scope.items = Item.query();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
      selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
      selector: '.animate-fade-slide-in .item'
    });

  });
