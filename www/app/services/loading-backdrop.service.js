angular.module('homemade')
  .factory('loadingBackdrop', function ($ionicLoading) {
    return function (logic) {
      $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
        animation: 'fade-in',
        showBackdrop: true
      });
      return logic().then(function (result) {
          $ionicLoading.hide();
          return result;
        })
    }
  });
