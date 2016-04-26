angular.module('starter')
  .factory('Resource', function ($resource) {
    return {
      'new': function (model, extraActions) {
        var baseUrl = '//' + location.hostname + ':3000/api/' + model + '/:id';
        extraActions = extraActions || {};

        for (var actionName in extraActions)
        {
          var action = extraActions[actionName];
          if (action.hasOwnProperty('relativeUrl'))
          {
            action.url = baseUrl + '/' + action.relativeUrl;
            action.relativeUrl = undefined;
          }
        }

          return $resource(baseUrl, { id: '@_id' }, angular.extend({
          'get': {method: 'GET'},
          save: {method: 'POST'},
          update: {method: 'PUT'},
          query: {method: 'GET', isArray: true},
          remove: {method: 'DELETE'},
          'delete': {method: 'DELETE'}
        }, extraActions));
      }
    };
  });
