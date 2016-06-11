angular.module('homemade')
  .directive('hmdAddTags', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/add-tags/add-tags.html',
      scope: {
        item: '='
      },
      controller: function ($scope) {

        $scope.newTag = "";

        $scope.addTag = function() {
          $scope.item.tags.push($scope.newTag);
          $scope.newTag = "";
        };
      }
    };
  });
