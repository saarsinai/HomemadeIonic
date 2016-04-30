angular.module('homemade')
  .controller('GalleryCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    const Item = Resource.new("item");
    //$scope.shit = image.getDataUri("../assets/pizza.jpg", function(success){
      //console.log(success);
    //});

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    $scope.items = Item.query({populate: 'seller'});

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
      selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
      selector: '.animate-fade-slide-in .item'
    });
  });
