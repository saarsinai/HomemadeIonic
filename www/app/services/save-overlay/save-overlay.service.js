angular.module('homemade')
  .service('saveOverlay', function ($ionicPopup, $timeout) {

    var data = {};
    this.show = function ($scope, text) {
      text = text || 'Saving';
      data.$scope = $scope;
      $scope.popupStatus = 'saving';
      data.popup = $ionicPopup.show({
        templateUrl: 'app/services/save-overlay/save-overlay.html',
        title: text,
        scope: $scope,
      });
    };

    var showIcon = function (status) {

      data.$scope.popupStatus = status;
      return new Promise(function (resolve) {
        $timeout(function() {
          data.popup.close();
          resolve();
        }, 2000);
      });

    };

    this.error = function () {
      return showIcon('error');
    };

    this.success = function () {
      return showIcon('success');
    };
  });
