angular.module('homemade')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('app.item', {
      url: '/item/:itemId',
      views: {
        'menuContent': {
          templateUrl: 'app/item/item.html',
          controller: 'itemController'
        }
      }
    })
  })
  .controller('itemController', [ '$scope', '$stateParams', 'Resource', function($scope, $stateParams, Resource) {

    const Item = Resource.new("item", {
      'ofSeller': {
        method: 'GET',
        params: {populate: 'seller img'}
      }
    });

    var getItemById = function() {
      Item.ofSeller({id: $stateParams.itemId})
        .$promise.then(function(item) {

          $scope.item = item;
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
