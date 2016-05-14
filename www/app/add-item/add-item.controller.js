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
  .controller('AddItemCtrl', function ($scope, $stateParams, Resource, image, $timeout, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, initIonicView, Authorization) {
    initIonicView($scope, ionicMaterialInk, ionicMaterialMotion);

    $scope.item = {
      "name": '',
      "seller": '',
      details: '',
      "img": {data:''},
      "likes": [],
      "tags": [],
    };

    const Item = Resource.new("item");

    $scope.saveItem = function () {
      $scope.status = 'saving';
      $scope.item.seller = Authorization.getUser()._id;

      Item.save($scope.item).$promise.then(function (item, err) {
        if (err) {
          $scope.status = 'error';
          $ionicPopup.alert({
            title: 'Cannot add item',
            template: 'An error occur while saving new item'
          });
          console.error(JSON.stringify(err));
        } else {

          const Batch = Resource.new("itemBatch");
          Batch.save({
            "beginTime": Date.now(),
            "item": item._id,
            "itemsCount": 10,
            "itemsLeft": 10,
            "open": true
          }).$promise.then(function(batch) {
              $scope.status = 'success';
              $timeout(function () {
                $ionicHistory.goBack();
              }, 800);
            });
        }
      })
    };


    $scope.nextSlide = function () {
      $ionicSlideBoxDelegate.next(true)
    }

    $scope.previousSlide = function () {
      $ionicSlideBoxDelegate.previous(true)
    }
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
        $scope.item.img = { data:"data:image/jpeg;base64," + imageURI};
        $scope.nextSlide();
      }

      function onFail(message) {
        console.log('taking picture failed: ' + message);
      }
    };
  });
