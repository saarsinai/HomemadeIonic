angular.module('homemade')
  .directive('hmdBottomScreen', function() {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      templateUrl: 'app/directives/bottom-screen/bottom-screen.html',
      scope: {
        // your parameters here
      }
    };
  });
