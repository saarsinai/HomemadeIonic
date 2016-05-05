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
  .controller('StoreEditCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView, $ionicPopup, Authorization, saveOverlay) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    const User = Resource.new("user", {'items': {method: 'GET', relativeUrl: 'items', detail: true, isArray: true}});
    const Review = Resource.new("review", {
      'ofSeller': {
        method: 'GET',
        params: {limit: 3, sort: '-time', populate: 'reviewer'},
        isArray: true
      }
    });

    $scope.user = new User(angular.copy(Authorization.getUser()));

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
      // address to location
    };

    var validateStore = function (store) {

      if (!store.address || store.address.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save store',
          template: 'Please enter the address of the store'
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
