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
          controller: function ($timeout) {}
        }
      }
    });
  })
  .controller('itemWallCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    const Item = Resource.new("item");

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    $scope.items = Item.query({populate: 'seller img'});

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
      selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
      selector: '.animate-fade-slide-in .item'
    });
  });
