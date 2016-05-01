angular.module('homemade')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.userProfile', {
      url: '/userProfile',
      views: {
        'menuContent': {
          templateUrl: 'app/user-profile/user-profile.html',
          controller: 'UserProfileCtrl'
        }
      }
    })
  })
  .controller('UserProfileCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion) {

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

    const User = Resource.new("user");

    // TEMP USE: untill we can get session user (login screen)
    User.query().$promise.then(function(users, err){
      if (users != null){
        $scope.profile = users[0];
      }
    });

  });
