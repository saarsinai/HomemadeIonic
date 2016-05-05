angular.module('homemade')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.addReview', {
      url: '/store/addReview?sellerId',
      views: {
        'menuContent': {
          templateUrl: 'app/store/add-review/add-review.html',
          controller: 'AddReviewCtrl'
        }
      }
    })
  })
  .controller('AddReviewCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $ionicHistory, initIonicView, saveOverlay) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);
    const Review = Resource.new("review");

    $scope.review = {
      reviewed: $stateParams.sellerId,
      rating: 0,
      time: new Date()
    };

    var validateReview = function (review) {
      if (review.rating < 0.5) {
        $ionicPopup.alert({
          title: 'Cannot submit review',
          template: 'Please enter desired rating (press on the stars)'
        });
        return false;
      }
      if (!review.title || review.title.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot submit review',
          template: 'Please enter a title'
        });
        return false;
      }

      return true;
    };
    $scope.submitReview = function () {
      if (validateReview($scope.review)) {
        saveOverlay.show($scope);
        Review.save($scope.review).$promise
          .then(function () {
            return saveOverlay.success();
          }, function (err) {
            console.error(JSON.stringify(err));
            return saveOverlay.error();
          })
          .then(function () {
            $ionicHistory.goBack();
          });
      }
    };
  });
