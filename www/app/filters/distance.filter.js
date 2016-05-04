/**
 * Created by Tamir on 27/04/2016.
 */
angular.module('homemade')
  .filter('distance',  function () {
    return function(distance) {
      if (!distance) return;

      if (distance > 1) {
        return Math.round(distance*10)/10 + 'km';
      }

      return distance.toFixed(3)*1000 + 'm';
    };
  });
