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
          var tagExists = window._.includes($scope.item.tags, $scope.newTag);

          if ($scope.newTag != "" && !tagExists) {
            $scope.item.tags.push($scope.newTag);
            $scope.newTag = "";
          }
        };
      }
    };
  });
