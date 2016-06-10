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
  .filter('tel', function () {
    return function (tel) {
      if (!tel) { return ''; }

      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
        return tel;
      }

      var areaCode, number;

      switch (value.length) {
        case 9: // ######### -> ##-#######
          areaCode = value.slice(0, 2);
          number = value.slice(2);
          break;

        case 10: // ########## -> ###-#######
          areaCode = value.slice(0, 3);
          number = value.slice(3);
          break;

        default:
          return tel;
      }

      return (areaCode + "-" + number).trim();
    };
  })
  .controller("StoreController", function ($scope, $stateParams, $q, Resource, ionicMaterialInk, ionicMaterialMotion, initIonicView, $ionicModal, NgMap) {
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

    $ionicModal.fromTemplateUrl('app/store/store-location/store-location.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.mapModal = modal;
    });

    $scope.openMapModal = function () {
      $scope.mapModal.show()
        .then(function () {
          return NgMap.getMap();
        })
        .then(function (map) {
          map.panTo(map.markers[0].getPosition());
        });
    };

    $scope.closeMapModal = function () {
      $scope.mapModal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.mapModal.remove();
    });
  });
