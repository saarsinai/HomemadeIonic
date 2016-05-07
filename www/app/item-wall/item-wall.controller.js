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
          controller: function ($timeout) {
          }
        }
      }
    });
  })
  .controller('itemWallCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView, Authorization) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);
    const Recommend = Resource.new("recommended", {'toUser': {method: 'GET', isArray: true}});

    var user = Authorization.getUser();

    $scope.showSpinner = true;
    $scope.currentLocation = {};

    var onSuccess = function(position) {
      Recommend.toUser({id: user._id, lat: position.coords.latitude, lon: position.coords.longitude}).$promise
      .then(function (items) {
        $scope.showSpinner=false;
        $scope.items = items;
      }).catch(function (err) {
        console.log(JSON.stringify(err));
      });
    };

    function onError(error) {
      console.log('location error - code: ' + error.code + ', message: ' + error.message );
    }

    var locationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions);
  });
