angular.module('starter')
  .directive('hmdStarRating', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/star-rating/star-rating.html',
      scope: {
        rating: '=',
        size: '@'
      }
    };
  });
