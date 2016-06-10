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
  .controller('StoreEditCtrl', function ($scope, Resource, ionicMaterialInk, ionicMaterialMotion, initIonicView, $ionicPopup, Authorization, saveOverlay, $q, loadingBackdrop) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    const SellerRecommends = Resource.new("sellerRecommend", {'toUser': {method: 'GET', isArray: true}});

    const User = Resource.new("user", {
      'items': {method: 'GET', relativeUrl: 'items', detail: true, isArray: true},
      'locate': {method: 'GET', relativeUrl: 'locate', detail: false, isArray: false}
    });
    const Review = Resource.new("review", {
      'ofSeller': {
        method: 'GET',
        params: {sort: '-time', populate: 'reviewer', limit: 3},
        isArray: true
      }
    });

    const Purchase = Resource.new("purchase", {
      'getWithItem': {
        method: 'GET',
        params: {sort: '-time', populate: 'item buyer', limit: 3}, isArray: true
      }
    });

    $scope.user = new User(angular.copy(Authorization.getUser()));
    $scope.originUser = Authorization.getUser();
    $scope.isAddressCool = true;
    $scope.isNew = !$scope.user.store.active;
    $scope.title = $scope.isNew ? 'Create Your Store' : 'Edit Your Store';
    $scope.saveButtonText = $scope.isNew ? 'Create Store' : 'Save Changes';

    var loadDataFromServer = function () {
      // Seller has store
      var userPromise = User.items({id: $scope.user._id}).$promise;
      var reviewsPromise = Review.ofSeller({reviewed: $scope.user._id}).$promise;
      var topTagsPromise = SellerRecommends.toUser({id: $scope.user._id}).$promise;
      var purchasesPromise = Purchase.getWithItem({seller: $scope.user._id}).$promise;
      return $q.all([userPromise, reviewsPromise, topTagsPromise, purchasesPromise]);
    };

    if (!$scope.isNew) {
      loadingBackdrop(loadDataFromServer)
        .then(function (data) {
          $scope.items = data[0];
          $scope.reviews = data[1];
          $scope.topTags = data[2];
          $scope.purchases = data[3];
        })
        .catch(console.errorJson);
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
          .then(function (res) {
            $scope.isNew = false;
            Authorization.setUser($scope.user, res.token);
            return saveOverlay.success();
          }, function (err) {
            console.error(JSON.stringify(err));
            return saveOverlay.error();
          });
      }
    };
  });
