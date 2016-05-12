/**
 * Created by Kobi on 5/9/2016.
 */
angular.module('homemade')
  .filter('uppercase',  function () {
    return function(str) {
      if (str) {
        return str.toUpperCase();
      } else {
        return "";
      }
    };
  });
