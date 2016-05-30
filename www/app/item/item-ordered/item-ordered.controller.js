angular.module('homemade')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.itemOrdered', {
      url: '/item/itemOrdered?purchaseId',
      views: {
        'menuContent': {
          templateUrl: 'app/item/item-ordered/item-ordered.html',
          controller: 'ItemOrderedCtrl'
        }
      }
    })
  })
  .controller('ItemOrderedCtrl', function ($scope, $stateParams, Resource, image, $timeout, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, initIonicView, loadingBackdrop) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);
    const Purchase = Resource.new('purchase', {
      'withPopulate': {
        method: 'GET',
        params: {populate: 'item seller'}
      }
    });

    var loadDataFromServer = function () {
      return Purchase.withPopulate({id: $stateParams.purchaseId}).$promise;
    };

    loadingBackdrop(loadDataFromServer)
      .then(function (purchase) {
        $scope.purchase = purchase;
      });

    $scope.navigateToSeller = function () {
      var location = $scope.purchase.seller.store.location;
      if (launchnavigator) {
        launchnavigator.navigate([location.lat, location.lon]);
      } else {
        alert('navigating to ' + JSON.stringify(location));
      }
    }
  });
