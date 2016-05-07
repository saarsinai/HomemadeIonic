var app = angular.module("homemade")
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.store', {
      url: '/store/:sellerId',
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
  .controller("StoreController", function ($scope, $stateParams , Resource, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
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

    User.get({id: $stateParams.sellerId}).$promise
    .then(function(seller){
        $scope.seller = seller;
      }).catch(logError);

    User.items({id: $stateParams.sellerId}).$promise
      .then(function (items) {
        $scope.items = items;
      })
      .catch(logError);

    Review.ofSeller({reviewed: $stateParams.sellerId}).$promise
      .then(function (reviews) {
        $scope.reviews = reviews;
      })
      .catch(logError);
  });
