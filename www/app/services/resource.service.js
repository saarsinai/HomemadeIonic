angular.module('starter')
  .factory('Resource', function ($resource) {
    return {
      'new': function (model, extraActions) {
        return $resource('//' + location.hostname + ':3000/api/' + model + '/:id', { id: '@_id' }, angular.extend({
          'get': {method: 'GET'},
          save: {method: 'POST'},
          update: {method: 'PUT'},
          query: {method: 'GET', isArray: true},
          remove: {method: 'DELETE'},
          'delete': {method: 'DELETE'}
        }, extraActions || {}));
      }
    };
  });
