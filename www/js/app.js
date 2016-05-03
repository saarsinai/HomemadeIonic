// 'starter.controllers' is found in controllers.js

angular.module('homemade', ['ionic', 'homemade.controllers', 'ionic-material', 'ionMdInput', 'ngResource'])

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
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'app/wall/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                controller: function ($timeout) {
                }
            }
        }
    })

    .state('app.store', {
        url: '/store',
        views: {
            'menuContent': {
                templateUrl: 'app/store/store.html',
                controller: 'StoreController'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.item', {
        url: '/item/:itemId',
        views: {
            'menuContent': {
                templateUrl: 'app/item/item.html',
                controller: 'itemController'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/activity');
});
