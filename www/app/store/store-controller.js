var app = angular.module("starter");
app.controller("StoreController", function($scope, Resource, ionicMaterialInk, ionicMaterialMotion) {
  const User = Resource.new("user", {'items': {method: 'GET', relativeUrl: 'items', detail: true, isArray: true}});
  const Review = Resource.new("review", {'ofSeller': {method: 'GET', params: {limit: 3, sort: 'time', populate: 'reviewer'}, isArray: true}});
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);

  // temporary - will be replaced when we will have the id of the store
  User.query().$promise.then(function(sellers, err){
    var aSeller = null;
    sellers.forEach(function (s) {
      if (s.store.active) {
        aSeller = s;
      }
    });
    $scope.seller = aSeller;
    if (err) {
      console.error(JSON.stringify(err));
      return;
    }

    User.items({id: $scope.seller._id}).$promise.then(function(items, err){
      if (err) {
        console.error(JSON.stringify(err));
        return;
      }
      $scope.items = items;
    });

    Review.ofSeller({reviewed: $scope.seller._id}).$promise.then(function(reviews, err){
      if (err) {
        console.error(JSON.stringify(err));
        return;
      }
      $scope.reviews = reviews;
    });
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
