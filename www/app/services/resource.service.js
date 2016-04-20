angular.module('starter')
  .factory('Resource', function ($resource) {
    return {
      'new': function (model) {
        return $resource('//' + location.hostname + ':3000/api/' + model + '/:id', {
          'get': {method: 'GET', isArray: true},
          save: {method: 'POST'},
          query: {method: 'GET', isArray: true},
          remove: {method: 'DELETE'},
          'delete': {method: 'DELETE'}
        });
      }
    };
  });
