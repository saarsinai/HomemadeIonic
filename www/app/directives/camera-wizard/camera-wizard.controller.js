angular.module('homemade')
  .directive('hmdCameraWizard', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/camera-wizard/camera-wizard.html',
      scope: {
        // your parameters here
      },
      controller: function($scope, ionicMaterialInk, ionicMaterialMotion, $ionicPopup){
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
          selector: '.push-down'
        });

        $scope.$on('wizard:StepFailed', function(e, args) {
          if (args.index == 1 && args.direction == "next") {
            $ionicPopup.alert({
              title: 'Empty field',
              template: 'Please enter a value!'
            }).then(function (res) {
              console.log('Field is empty');
            });
          }
        });

      }
    };
  });
