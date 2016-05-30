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
  .controller('ReviewsCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView, loadingBackdrop) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);
    const Review = Resource.new("review", {
      'ofSeller': {
        method: 'GET',
        params: {sort: '-time', populate: 'reviewer'},
        isArray: true
      }
    });

    $scope.loadDataFromServer = function () {
      return Review.ofSeller({reviewed: $stateParams.sellerId}).$promise
    };

    $scope.loadData = function () {
      $scope.$broadcast('scroll.refreshComplete');
        loadingBackdrop($scope.loadDataFromServer)
          .then(function (reviews) {
            $scope.reviews = reviews;
          }, function (err) {
            console.error(JSON.stringify(err));
          });
    };

    $scope.loadData();
  });
