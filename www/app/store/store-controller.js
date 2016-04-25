var app = angular.module("starter");
app.controller("StoreController", function($scope, Resource, ionicMaterialInk, ionicMaterialMotion) {
  const User = Resource.new("user");
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);

  User.query().$promise.then(function(sellers, err){
      $scope.sellerUser = sellers[0];
    if (err)
    {
      console.log(err);
    }
  });

  // Activate ink for controller
  ionicMaterialInk.displayEffect();

  ionicMaterialMotion.pushDown({
    selector: '.push-down'
  });
  ionicMaterialMotion.fadeSlideInRight({
    selector: '.animate-fade-slide-in .item'
  });
})
