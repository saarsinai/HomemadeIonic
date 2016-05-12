angular.module('homemade')
  .factory('Authorization', function ($window, $q, $injector) {

    function isAuthorized() {
      // TODO: change if you want to get better authorization or compartmentalization system.
      if ($window.sessionStorage.currentUser){
        return true;
      }
      return false;
    }

    function setUser(user, token) {
      $window.sessionStorage.token = token;
      $window.sessionStorage.currentUser = JSON.stringify(user);
    }

    function getUser() {
      if (isAuthorized()) {
        return JSON.parse($window.sessionStorage.currentUser);
      }
    }

    function getToken() {
      return $window.sessionStorage.token;
    }

    function logOffUser() {
      if (isAuthorized()) {
        delete $window.sessionStorage.currentUser;
        delete $window.sessionStorage.token;
      }
    }

    function putTokenOnRequest(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    }

    function checkAuthorized(response) {
      if (response.status === 401) {
        var stateService = $injector.get('$state');
        stateService.go('login');
      }

      return response || $q.when(response);
    }

    return {
      isAuthorized: isAuthorized,
      setUser: setUser,
      getUser: getUser,
      getToken: getToken,
      logOffUser: logOffUser,
      request: putTokenOnRequest,
      responseError: checkAuthorized
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('Authorization');
  });
