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
  .controller("StoreController", function ($scope, $stateParams, $q, Resource, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
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

    $scope.loadData = function () {

      User.get({id: $stateParams.sellerId}).$promise
        .then(function (seller) {
          $scope.seller = seller;
          return $q.all([
            User.items({id: $stateParams.sellerId}).$promise,
            Review.ofSeller({reviewed: $stateParams.sellerId}).$promise
          ]);
        })
        .then(function (values) {
          $scope.items = values[0];
          $scope.reviews = values[1];
        })
        .catch(logError)
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.loadData();
  });
