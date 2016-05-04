angular.module('homemade')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.itemWall', {
      url: '/itemWall',
      views: {
        'menuContent': {
          templateUrl: 'app/item-wall/item-wall.html',
          controller: 'itemWallCtrl'
        },
        'fabContent': {
          controller: function ($timeout) {}
        }
      }
    });
  })
  .controller('itemWallCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    const Recommend = Resource.new("recommended", {'toUser': {method: 'GET', isArray: true}});
    const User = Resource.new("user");

    User.query().$promise.then(function (users) {
      return Recommend.toUser({id: users[0]._id, lat: 31.9699, lon: 34.8014}).$promise;
    }).then(function (items) {
      $scope.items = items;
    }).catch(function (err) {
      console.log(JSON.stringify(err));
    });
  });
