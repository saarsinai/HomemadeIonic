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
  .controller('UserProfileCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
      selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
      selector: '.animate-fade-slide-in .item'
    });

    const User = Resource.new("user");
    const Purchase = Resource.new("purchase", {
      'ofUser': {
        method: 'GET',
        isArray: true,
        params: {sort: '-time', populate: 'item'}
      }
    });

    // TEMP USE: untill we can get session user (login screen)
    User.query().$promise.then(function (users, err) {
      if (err) {
        // do log error
        return; // :(
      }

      $scope.profile = users[0];
      return Purchase.ofUser({buyer: $scope.profile._id}).$promise;
    }).then(function (purchases, err) {
      const Img = Resource.new("img");
      angular.forEach(purchases, function (purchase, key) {
        Img.get(purchase.item.img).$promise.then(function (image, err) {
          if (err) {
            console.log(JSON.stringify(err))
          }
          purchase.item.img = image;
        })
      })
      $scope.purchases = purchases;
    });
  });
