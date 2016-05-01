angular.module('homemade')
  .directive('hmdUserItemPurchase', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/user-item-purchase/user-item-purchase.html',
      link: link,
      scope: {
        item: '='
      }
    };
  });
