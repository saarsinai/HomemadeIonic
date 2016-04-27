/**
 * Created by Tamir on 27/04/2016.
 */
angular.module('starter')
  .filter('emptyAsUnknown',  function () {
    return function(str) {
      if (!str || str.length === 0) {
        return 'Unknown';
      }

      return str;
    };
  });
