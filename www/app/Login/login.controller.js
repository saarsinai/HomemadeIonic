angular.module('homemade')
  .config(function ($stateProvider) {
    $stateProvider.state('app.login', {
      url: '/login',
      isOpen: true,
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
  .controller('LoginCtrl', function ($scope, $timeout, $stateParams, ionicMaterialInk, Resource,$state, Authorization) {
    const User = Resource.new("user", {"authenticate": {method: 'POST', relativeUrl: 'authenticate', detail: false}, "signUp": {method: 'POST', relativeUrl: 'signUp', detail: false} });

    $scope.user = {};

    var loginError = function (res, status) {
      // TODO: nice message of "bad username or password"
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
      var user = {
        name: 'Moshe',
        username: 'maxm',
        password: 'anu',
        gander: 'M',
        age: 28,
        email: 'moshe@secret.net'
      };

      User.signUp(user).$promise
        .then(function (res) {
          Authorization.setUser(res.user, res.token);
          $state.go('app.itemWall');
        })
        .catch(function (err) {
          console.error(JSON.stringify(err))
        });
    };

    $scope.$parent.clearFabs();
    $timeout(function () {
      $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
  });
