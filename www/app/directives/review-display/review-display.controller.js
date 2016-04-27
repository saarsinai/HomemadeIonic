angular.module('starter')
  .directive('hmdReviewDisplay', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/review-display/review-display.html',
      scope: {
        review: '='
      }
    };
  });
