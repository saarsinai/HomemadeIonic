angular.module('homemade')
  .service('saveOverlay', function ($ionicPopup, $timeout) {

    var data = {};
    this.show = function ($scope, text) {
      text = text || 'Saving';
      data.$scope = $scope;
      $scope.popup = {status: 'saving'};
      data.popup = $ionicPopup.show({
        templateUrl: 'app/services/save-overlay/save-overlay.html',
        title: text,
        scope: $scope,
        cssClass: 'save-overlay-popup'
      });
    };

    var showIcon = function (status, message) {

      data.$scope.popup.message = message;
      data.$scope.popup.status = status;

      return new Promise(function (resolve) {
        $timeout(function() {
          data.popup.close();
          $timeout(function () {
            data.$scope.popup = undefined;
          }, 1000);
          resolve();
        }, 2000);
      });

    };

    this.error = function (message) {
      return showIcon('error', message);
    };

    this.success = function () {
      return showIcon('success');
    };
  });
