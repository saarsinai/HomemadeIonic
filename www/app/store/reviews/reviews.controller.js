angular.module('starter')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.reviews', {
      url: '/store/reviews/:userId',
      views: {
        'menuContent': {
          templateUrl: 'app/store/reviews/reviews.html',
          controller: 'ReviewsCtrl'
        }
      }
    })
  })
  .controller('ReviewsCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    const Review = Resource.new("review", {'ofSeller': {method: 'GET', params: {sort: 'time', populate: 'reviewer'}, isArray: true}});
    Review.ofSeller({reviewed: $stateParams.userId}).$promise.then(function(reviews, err) {
      if (err)
      {
        console.log(err);
        return;
      }
      $scope.reviews = reviews;
    });

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
