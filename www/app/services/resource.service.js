angular.module('starter')
  .factory('Resource', function ($resource) {
    return {
      'new': function (model, extraActions) {
        return $resource('//' + location.hostname + ':3000/api/' + model + '/:id', angular.extend({
          'get': {method: 'GET'},
          save: {method: 'POST'},
          query: {method: 'GET', isArray: true},
          remove: {method: 'DELETE'},
          'delete': {method: 'DELETE'}
        }, extraActions || {}));
      }
    };
  });
