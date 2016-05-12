angular.module('homemade')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.reviews', {
      url: '/store/reviews/:sellerId',
      views: {
        'menuContent': {
          templateUrl: 'app/store/reviews/reviews.html',
          controller: 'ReviewsCtrl'
        }
      }
    })
  })
  .controller('ReviewsCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);
    const Review = Resource.new("review", {
      'ofSeller': {
        method: 'GET',
        params: {sort: '-time', populate: 'reviewer'},
        isArray: true
      }
    });
    $scope.loadData = function () {
      Review.ofSeller({reviewed: $stateParams.sellerId}).$promise
        .then(function (reviews) {
          $scope.reviews = reviews;
        }, function (err) {
          console.error(JSON.stringify(err));
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.loadData();
  });
