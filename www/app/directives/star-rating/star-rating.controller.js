'use strict';

angular.module('homemade')
  .directive('hmdStarRating', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/star-rating/star-rating.html',
      scope: {
        rating: '=',
        size: '@',
        readonly: '@'
      },
      controller: function ($scope) {
        $scope.setRating = function(rating){
          if (!$scope.readonly) {
            if ($scope.rating === rating) {
              // another tap is half a star
              $scope.rating = rating - 0.5;
            } else {
              $scope.rating = rating;
            }
          }
        }
      }
    };
  });
