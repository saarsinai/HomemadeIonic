var app = angular.module("starter");
app.controller("StoreController", function($scope, Resource, ionicMaterialInk, ionicMaterialMotion) {
  const User = Resource.new("user", {'items': {method: 'GET', relativeUrl: 'items', isArray: true}});
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);

  // temporary - will be replaced when we will have the id of the store
  User.query().$promise.then(function(sellers, err){

    $scope.seller = sellers[0];

    User.items({id: $scope.seller._id}).$promise.then(function(items, err){
      $scope.seller.store.items = items;
      if (err)
      {
        console.log(err);
      }
    });
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
