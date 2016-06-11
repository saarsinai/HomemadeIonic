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
    var position;

    $scope.loadInitialData = function () {
      $scope.showLocationSpinner = true;
      $scope.items = [];
      $scope.reachedEnd = false;
      position = {};

      var onSuccess = function (pos) {
        position = pos;
        $scope.loadMoreData();
      };

      var onError = function(error) {
        $scope.$broadcast('scroll.refreshComplete');
        console.log('location error - code: ' + error.code + ', message: ' + error.message);
      };

      var locationOptions = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};

      //if (typeof cordova !== 'undefined') {
      //  cordova.plugins.diagnostic.requestRuntimePermission(function (status) {
      //    switch (status) {
      //      case cordova.plugins.diagnostic.permissionStatus.GRANTED:
      //        console.log("Permission granted to use the location");
      //        navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions);
      //        break;
      //      case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
      //        console.log("Permission to use the location has not been requested yet");
      //        break;
      //      case cordova.plugins.diagnostic.permissionStatus.DENIED:
      //        console.log("Permission denied to use the location - ask again?");
      //        break;
      //      case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
      //        console.log("Permission permanently denied to use the location - guess we won't be using it then!");
      //        break;
      //    }
      //  }, function (error) {
      //    console.error("The following error occurred: " + error);
      //  }, cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION);
      //} else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions);
      //}
    };

    $scope.refreshData = function () {
      $scope.loadInitialData();
    };

    $scope.loadMoreData = function () {
      Recommend.toUser({id: user._id, searchName: $scope.search.text, lat: position.coords.latitude, lon: position.coords.longitude, from: $scope.items.length}).$promise
        .then(function (items) {
          $scope.reachedEnd = items.length < 10;
          Array.prototype.push.apply($scope.items, items);
        })
        .catch(function (err) {
          // TODO: show error message
          console.log(JSON.stringify(err));
        })
        .finally(function () {
          $scope.showLocationSpinner = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.search = {
      searching: false,
      searchRequest: function () {
        $scope.loadInitialData();
      },
      clear: function () {
        $scope.search.searching = false;
        $scope.search.text = undefined;
        $scope.loadInitialData();
      }
    };

    $scope.loadInitialData();
  });
