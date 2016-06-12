// 'starter.controllers' is found in controllers.js

angular.module('homemade', ['ionic','ionic.service.core', 'homemade.controllers', 'ionic-material', 'ionMdInput', 'ngResource', 'monospaced.elastic', 'ngMap', 'timer', 'ngFitText', 'chart.js', 'ngMessages'])

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
        templateUrl: 'app/templates/menu.html',
        controller: 'AppCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function($injector){
      var $state = $injector.get("$state");
      $state.go('app.itemWall');
    });
  });
