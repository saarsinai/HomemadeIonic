angular.module('starter')
  .factory('Resource', function ($resource) {
    return {
      'new': function (model, extraActions) {
        var baseUrl = '//' + '10.0.0.4' + ':3000/api/' + model;
        var baseUrlDetail = baseUrl + '/:id';
        extraActions = extraActions || {};

        for (var actionName in extraActions)
        {
          var action = extraActions[actionName];

          if (action.hasOwnProperty('relativeUrl'))
          {
            var url = (action.detail || false) ? baseUrlDetail : baseUrl;
            action.url = url + '/' + action.relativeUrl;

            // clean up
            action.relativeUrl = undefined;
            action.detail = undefined;
          }
        }

          return $resource(baseUrlDetail, { id: '@_id' }, angular.extend({
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
