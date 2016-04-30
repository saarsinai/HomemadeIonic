angular.module('starter')
  .directive('hmdReviewHeader', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/review-header/review-header.html',
      scope: {
        review: '='
      }
    };
  });