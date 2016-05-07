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

    $scope.showSpinner = true;
    $scope.currentLocation = {};

    var onSuccess = function(position) {
      User.query().$promise.then(function (users) {
        return Recommend.toUser({id: users[0]._id, lat: position.coords.latitude, lon: position.coords.longitude}).$promise;
      }).then(function (items) {
        $scope.showSpinner=false;
        $scope.items = items;
      }).catch(function (err) {
        console.log(JSON.stringify(err));
      });
    };

    function onError(error) {
      alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    };

    var locationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions);

  });
