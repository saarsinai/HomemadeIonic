var app = angular.module("homemade")
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.store', {
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
    });
  })
  .controller("StoreController", function ($scope, Resource, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    const User = Resource.new("user", {'items': {method: 'GET', relativeUrl: 'items', detail: true, isArray: true}});
    const Review = Resource.new("review", {
      'ofSeller': {
        method: 'GET',
        params: {limit: 3, sort: '-time', populate: 'reviewer'},
        isArray: true
      }
    });

    var logError = function (err) {
      console.error(JSON.stringify(err));
    };

    // temporary - will be replaced when we will have the id of the store
    User.query().$promise
      .then(function (sellers) {
        var aSeller = null;
        sellers.forEach(function (s) {
          if (s.store.active) {
            aSeller = s;
          }
        });
        $scope.seller = aSeller;

        User.items({id: $scope.seller._id}).$promise
          .then(function (items) {
            $scope.items = items;
          })
          .catch(logError);

        Review.ofSeller({reviewed: $scope.seller._id}).$promise
          .then(function (reviews) {
            $scope.reviews = reviews;
          })
          .catch(logError);
      })
      .catch(logError);
  });
