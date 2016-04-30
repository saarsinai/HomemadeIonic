angular.module('homemade')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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
  .controller('AddReviewCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopup, $ionicHistory) {
    const Review = Resource.new("review");

    $scope.review = {
      reviewed: $stateParams.sellerId,
      rating: 0,
      time: new Date()};

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
        $scope.status = 'saving';
        Review.save($scope.review).$promise.then(function (review, err) {
          if (err) {
            $scope.status = 'error';
            $ionicPopup.alert({
              title: 'Cannot submit review',
              template: 'An error occur while submitting the review'
            });
            console.error(JSON.stringify(err));
          } else {
            $scope.status = 'success';
            $timeout(function () {
              $ionicHistory.goBack();
            }, 800);
          }
        })
      }
    };


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
