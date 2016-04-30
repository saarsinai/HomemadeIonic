angular.module('starter')
  .config(function($stateProvider) {
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
  });
