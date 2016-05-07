angular.module('homemade')
  .config(function ($stateProvider) {
    $stateProvider.state('app.storeEdit', {
      url: '/storeEdit',
      views: {
        'menuContent': {
          templateUrl: 'app/store/store-edit/store-edit.html',
          controller: 'StoreEditCtrl'
        }
      }
    })
  })
  .controller('StoreEditCtrl', function ($scope, Resource, ionicMaterialInk, ionicMaterialMotion, initIonicView, $ionicPopup, Authorization, saveOverlay) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    const User = Resource.new("user", {
      'items': {method: 'GET', relativeUrl: 'items', detail: true, isArray: true},
      'locate': {method: 'GET', relativeUrl: 'locate', detail: false, isArray: false}
    });
    const Review = Resource.new("review", {
      'ofSeller': {
        method: 'GET',
        params: {limit: 3, sort: '-time', populate: 'reviewer'},
        isArray: true
      }
    });

      $scope.user = new User(angular.copy(Authorization.getUser()));
    $scope.originUser = Authorization.getUser();
    $scope.isAddressCool = true;
    $scope.isNew = !$scope.user.store.active;
    $scope.title = $scope.isNew ? 'Create Your Store' : 'Edit Your Store';
    $scope.saveButtonText = $scope.isNew ? 'Create Store' : 'Save Changes';
    var logError = function (err) {
      console.error(JSON.stringify(err));
    };

    if (!$scope.isNew) {
      User.items({id: $scope.user._id}).$promise
        .then(function (items) {
          $scope.items = items;
        })
        .catch(logError);

      Review.ofSeller({reviewed: $scope.user._id}).$promise
        .then(function (reviews) {
          $scope.reviews = reviews;
        })
        .catch(logError);
    }

    $scope.addressChanged = function () {
      var address = $scope.user.store.address;
      if (!address || address.length === 0) return;
      if (address === $scope.originUser.store.address) {
        $scope.user.store.location = $scope.originUser.store.location;
        return;
      }

      User.locate({address: address}).$promise
        .then(function (location) {
          $scope.user.store.location = location;
          $scope.isAddressCool = true;
        })
        .catch(function (err) {
          logError(err);
          $scope.isAddressCool = false;
          $ionicPopup.alert({
            title: 'Address does not match',
            template: 'We weren\'t able to find the exact location of address ' + address
          });
        });
    };

    var validateStore = function (store) {

      if (!store.address || store.address.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save store',
          template: 'Please enter the address of the store'
        });
        return false;
      }
      if (!$scope.isAddressCool) {
        $ionicPopup.alert({
          title: 'Cannot save store',
          template: 'Please enter a recognizable address (couldn\'t find location from address)'
        });
        return false;
      }
      if (!store.name || store.name.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save store',
          template: 'Please enter the name of the store'
        });
        return false;
      }
      if (!store.description || store.description.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save store',
          template: 'Please enter the description of the store'
        });
        return false;
      }

      return true;
    };

    $scope.saveStore = function () {
      if (validateStore($scope.user.store)) {
        saveOverlay.show($scope);
        $scope.user.store.active = true;
        User.update($scope.user).$promise
          .then(function () {
            $scope.isNew = false;
            return saveOverlay.success();
          }, function (err) {
            console.error(JSON.stringify(err));
            return saveOverlay.error();
          });
      }
    };
  });
