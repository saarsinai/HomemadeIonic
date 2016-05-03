angular.module('homemade')
  .controller('itemController', [ '$scope', '$stateParams', 'Resource', function($scope, $stateParams, Resource) {

    const Item = Resource.new("item");
    const User = Resource.new("user");

    var getItemById = function() {
      Item.get({id: $stateParams.itemId})
        .$promise.then(function(item) {
          $scope.item = item;

          User.get({id: $scope.item.seller})
            .$promise.then(function(user) {
              $scope.user = user;
            }
            ,function(err) {
              console.error('Response error', err);
            });
          }
        ,function(err) {
          console.error('Response error', err);
        });
    };

    $scope.likeItem = function() {
      $scope.item.likes += 1;
      Item.update($scope.item)
        .$promise.then(function ()
        {
          console.log("like added!");
        },
        function (err) {
          console.log("error adding like");
        });
    };

    getItemById();

  }]);
