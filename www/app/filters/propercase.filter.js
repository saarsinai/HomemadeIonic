/**
 * Created by Kobi on 5/9/2016.
 */
angular.module('homemade')
  .filter('propercase',  function () {
    return function(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  });
