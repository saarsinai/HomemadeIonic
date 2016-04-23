angular.module('starter')
  .factory('image', function () {
    return {
      'new': function (image) {
        return "data:image/png;base64," + window.btoa(image);
        }
      }
  });
