angular.module('homemade')
  .config(function ($stateProvider) {
    $stateProvider.state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'app/Login/login.html',
          controller: 'LoginCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })
  })
  .controller('LoginCtrl', function ($scope, $timeout, $stateParams, ionicMaterialInk, Resource, Authorization) {

    // TODO: remove this when login screen is up
    const User = Resource.new("user");
    User.query().$promise.then(function (users) {
      Authorization.setUser(users[0]);
    })

    $scope.$parent.clearFabs();
    $timeout(function () {
      $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
  });
