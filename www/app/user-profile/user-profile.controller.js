angular.module('homemade')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.userProfile', {
      url: '/userProfile',
      views: {
        'menuContent': {
          templateUrl: 'app/user-profile/user-profile.html',
          controller: 'UserProfileCtrl'
        }
      }
    })
  })
  .controller('UserProfileCtrl', function ($scope, $stateParams, Resource, image, $timeout, $ionicPopup, ionicMaterialInk, ionicMaterialMotion, Authorization, initIonicView, saveOverlay) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    const User = Resource.new("user");
    const Purchase = Resource.new("purchase", {
      'ofUser': {
        method: 'GET',
        isArray: true,
        params: {sort: '-time', populate: 'item'}
      }
    });

    $scope.profile = Authorization.getUser();

    Purchase.ofUser({buyer: $scope.profile._id}).$promise
      .then(function (purchases) {
        const Img = Resource.new("img");

        // TODO 1: fix this horrible query
        // make better query on the server side that populate purchase.item.img
        // using one query and not many query per img
        angular.forEach(purchases, function (purchase, key) {
          Img.get({id: purchase.item.img}).$promise.then(function (image, err) {
            if (err) {
              console.log(JSON.stringify(err))
            }
            purchase.item.img = image;
          })
        })
        $scope.purchases = purchases;
      });

    var validateUser = function (profile) {

      if (!profile.name || profile.name.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save user',
          template: 'Please enter your name'
        });
        return false;
      }

      if (!profile.email || profile.email.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save user',
          template: 'Please enter your email address'
        });
        return false;
      }

      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailRegex.test(profile.email)) {
        $ionicPopup.alert({
          title: 'Cannot save user',
          template: 'Please enter a valid email address'
        });
        return false;
      }

      if (!profile.age || profile.age.length === 0) {
        $ionicPopup.alert({
          title: 'Cannot save user',
          template: 'Please enter your age'
        });
        return false;
      }

      var ageRegex = /^\d+$/;

      if (!ageRegex.test(profile.age)) {
        $ionicPopup.alert({
          title: 'Cannot save user',
          template: 'Please enter age with numbers only'
        });
        return false;
      }
      return true;
    };

    $scope.saveUser = function () {
      if (validateUser($scope.profile)) {
        saveOverlay.show($scope);

        User.update($scope.profile).$promise
          .then(function (res) {
            return saveOverlay.success();
          },
          function (err) {
            console.error(JSON.stringify(err));
            return saveOverlay.error();
          });
      }
    };
  })
;
