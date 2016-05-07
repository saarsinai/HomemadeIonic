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
  .controller('UserProfileCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, Authorization, initIonicView) {
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
        // make beter query on the server side that populate purchase.item.img
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
  })
;
