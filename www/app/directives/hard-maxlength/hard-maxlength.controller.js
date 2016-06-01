angular.module('homemade')
  .directive('hmdHardMaxlength', ['$compile', '$log', function($compile, $log) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        attrs.$set("ngTrim", "false");
        var maxlength = parseInt(attrs.hmdHardMaxlength, 10);
        ctrl.$parsers.push(function (value) {
          if (value.length > maxlength)
          {
            value = value.substr(0, maxlength);
            ctrl.$setViewValue(value);
            ctrl.$render();
          }
          return value;
        });
      }
    };
  }]);

