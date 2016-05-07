// 'starter.controllers' is found in controllers.js

angular.module('homemade', ['ionic', 'homemade.controllers', 'ionic-material', 'ionMdInput', 'ngResource', 'monospaced.elastic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/templates/menu.html',
        controller: 'AppCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function($injector){
      var $state = $injector.get("$state");
      $state.go('app.itemWall');
    });
  })
  .run(function($rootScope, $location, $state, Authorization) {
    $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

      // states express that about themselves if they want to be open for requests (like login and signUp)
      if(toState.isOpen){
        return; // no need to redirect
      }

      if(!Authorization.isAuthorized()) {
        e.preventDefault(); // stop current execution
        $state.go('app.login'); // go to login
      }
    });
  });
