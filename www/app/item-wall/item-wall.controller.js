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
  .controller('itemWallCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView, Authorization, $ionicModal, $ionicPopup) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);


    const Recommend = Resource.new("recommended", {'toUser': {method: 'GET', isArray: true}});
    const User = Resource.new("user", {
      'locate': {method: 'GET', relativeUrl: 'locate', detail: false, isArray: false}
    });

    var user = Authorization.getUser();

    $scope.loadInitialData = function () {
      $scope.showLocationSpinner = true;
      $scope.items = [];
      $scope.reachedEnd = false;

      if ($scope.positioning.otherLocation) {
        $scope.loadMoreData();
      } else {
        var onSuccess = function (pos) {
          $scope.positioning.location = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          };
          $scope.loadMoreData();
        };

        var onError = function (error) {
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
      }
    };

    $scope.refreshData = function () {
      $scope.loadInitialData();
    };

    $scope.loadMoreData = function () {
      Recommend.toUser({id: user._id, searchName: $scope.search.text, lat: $scope.positioning.location.lat, lon: $scope.positioning.location.lon, from: $scope.items.length}).$promise
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

    $scope.positioning = {
      location: null,
      address: "",
      legalLocation: false,
      otherLocation: false
    };

    $ionicModal.fromTemplateUrl('app/item-wall/other-location/other-location.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.locationModal = modal;
    });

    $scope.openLocationModal = function () {
      $scope.locationModal.show();
    };

    $scope.closeLocationModal = function () {
      $scope.locationModal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.locationModal.remove();
    });

    $scope.showOtherLocation = function () {
      $scope.positioning.otherLocation = true;
      $scope.loadInitialData();
      $scope.closeLocationModal();
    };

    $scope.clearOtherLocation = function () {
      $scope.positioning = {
        location: null,
        address: "",
        legalLocation: false,
        otherLocation: false
      };
      $scope.loadInitialData();
      $scope.closeLocationModal();
    };

    $scope.checkLocation = function () {
      var address = $scope.positioning.address;
      if (!address || address.length === 0) return;

      User.locate({address: address}).$promise
        .then(function (location) {
          $scope.positioning.location = location;
          $scope.positioning.legalLocation = true;
        })
        .catch(function (err) {
          console.error(err);
          $scope.positioning.legalLocation = false;
          $ionicPopup.alert({
            title: 'Address does not match',
            template: 'We weren\'t able to find the exact location of address ' + address
          });
        });
    };

    $scope.loadInitialData();
  });
