angular.module('homemade')
  .config(function ($stateProvider) {
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
  .controller('AddItemCtrl', function ($scope, $stateParams, Resource, image, $timeout, ionicMaterialInk, ionicMaterialMotion, initIonicView) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    $scope.takePicture = function () {

      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 200,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      });

      function onSuccess(imageURI) {
        $scope.imgURI = "data:image/jpeg;base64," + imageURI;
        console.log(image.src);
      }

      function onFail(message) {
        console.log('taking picture failed: ' + message);
      }
    };
  });
