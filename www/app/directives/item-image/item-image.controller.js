angular.module('homemade')
  .directive('hmdItemImage', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/item-image/item-image.html',
      scope: {
        image: '=',
        readonly: '@'
      },
      controller: function ($scope, $ionicBackdrop, $timeout) {
        $scope.retakeImage = function () {
          if (navigator.camera) {
            navigator.camera.getPicture(onSuccess, onFail, {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              mediaType: Camera.MediaType.PICTURE,
              targetWidth: 900,
              targetHeight: 600,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation: false
            });

            function onSuccess(imageURI) {
              $scope.image.data= "data:image/jpg;base64," + imageURI;

              // very ugly hack to refresh the image - otherwise the image doesn't get refreshed on the phone
              $ionicBackdrop.retain();
              $timeout(function() {
                $ionicBackdrop.release();
              }, 0);

            }

            function onFail(message) {
              console.log('taking picture failed: ' + message);
            }
          } else {
            console.log("image changed to pasta");
            $scope.image.data = "data:image/jpeg;base64," + "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";
          }
        };
      }
    };
  });
