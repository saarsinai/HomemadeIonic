angular.module('starter')
  .controller('itemController', [ '$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

    var getItemById = function() {

      $scope.item = {
        "name": "Pizza Peperoni",
        "seller": "Gal Revach",
        "address": "Metzada 7, Hod Hasharon",
        "distance": 0.7,
        "rating": 4,
        "pricePerItem": 9,
        "details": "it's italian!! the best there is",
        "tags": ["pizza", "italian", "non-kosher"]
      }

      // $http.get('api/item/' + $stateParams.itemId)
      //   .then(function(response) {
      //     $scope.item = response.data;
      //   })
      //   .catch(function(err) {
      //     console.error('Response error', err);
      //   });
    };

    getItemById();

  }]);
