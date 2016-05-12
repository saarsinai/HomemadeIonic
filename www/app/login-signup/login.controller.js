angular.module('homemade')
  .config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      isOpen: true,
      templateUrl: 'app/login-signup/login.html',
      controller: 'LoginCtrl'
    })
  })
  .controller('LoginCtrl', function ($scope, $timeout, $stateParams, ionicMaterialInk, Resource,$state, Authorization, $ionicHistory) {
    const User = Resource.new("user", {"authenticate": {method: 'POST', relativeUrl: 'authenticate', detail: false}, "signUp": {method: 'POST', relativeUrl: 'signUp', detail: false} });

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $scope.user = {};
    $scope.signUpMode = false;

    var loginError = function (res, status) {
      // TODO: nice message of "bad email or password"
      Authorization.logOffUser();
    };

    $scope.login = function () {
      User.authenticate($scope.user).$promise
        .then(function (res) {
          if (res.authenticated) {
            Authorization.setUser(res.user, res.token);
            $state.go('app.itemWall');
          } else {
            loginError(res);
          }
        })
        .catch(loginError);
    };

    $scope.signUp = function () {
      if (!$scope.signUpMode) {
        $scope.signUpMode = true;
        return;
      }

      // TODO: validate user properties
      User.signUp($scope.user).$promise
        .then(function (res) {
          Authorization.setUser(res.user, res.token);
          $state.go('app.itemWall');
        })
        .catch(function (err) {
          console.error(JSON.stringify(err))
        });
    };

    //$scope.$parent.clearFabs();
    //$timeout(function () {
    //  $scope.$parent.hideHeader();
    //}, 0);
    ionicMaterialInk.displayEffect();
  })
  .run(function($rootScope, $location, $state, Authorization) {
    $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

      // states express that about themselves if they want to be open for requests (like login and signUp)
      if(toState.isOpen){
        return; // no need to redirect
      }

      if(!Authorization.isAuthorized()) {
        e.preventDefault(); // stop current execution
        $state.go('login'); // go to login
      }
    });
  });
