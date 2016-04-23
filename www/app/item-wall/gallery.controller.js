angular.module('starter')
  .controller('GalleryCtrl', function ($scope, $stateParams, Resource, item, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    const Item = Resource.new("item");
    var img = new Image();
    img.src='../assets/me.jpg';

    //var shit = image.new(img);
    //console.log(shit);

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
