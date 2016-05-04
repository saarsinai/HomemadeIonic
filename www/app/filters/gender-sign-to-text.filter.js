/**
 * Created by Tamir on 27/04/2016.
 */
angular.module('homemade')
  .filter('genderSignToText', function () {
    return function (genderSign) {
      if (genderSign) {
        if (genderSign.toLowerCase() === "m") {
          return "Man";
        } else if (genderSign.toLowerCase() === "f") {
          return "Woman";
        }
      }

      return genderSign;
    };
  });
