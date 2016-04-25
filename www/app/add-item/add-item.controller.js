angular.module('starter')
  .config(function($stateProvider) {
    $stateProvider.state('app.addItem', {
      url: '/addItem',
      views: {
        'menuContent': {
          templateUrl: 'app/add-item/add-item.html',
          controller: 'AddItemCtrl'
        }
      }
    })
  })
  .controller('AddItemCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion) {

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
  });
