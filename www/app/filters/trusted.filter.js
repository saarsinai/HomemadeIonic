/**
 * Created by Kobi on 4/24/2016.
 */
angular.module('homemade')
  .filter('trusted', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);
