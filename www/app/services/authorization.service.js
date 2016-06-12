angular.module('homemade')
  .factory('Authorization', function ($window, $q, $injector, $rootScope) {

    function isAuthorized() {
      // TODO: change if you want to get better authorization or compartmentalization system.
      if ($window.localStorage.currentUser){
        return true;
      }
      return false;
    }

    function setUser(user, token) {
      $window.localStorage.token = token;
      $window.localStorage.currentUser = JSON.stringify(user);
      $rootScope.username = user.name;
    }

    function getUser() {
      if (isAuthorized()) {
        return JSON.parse($window.localStorage.currentUser);
      }
    }

    function getToken() {
      return $window.localStorage.token;
    }

    function logOffUser() {
      if (isAuthorized()) {
        delete $window.localStorage.currentUser;
        delete $window.localStorage.token;
      }
    }

    function putTokenOnRequest(config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
      }
      return config;
    }

    function checkAuthorized(response) {
      if (response.status === 401) {
        var stateService = $injector.get('$state');
        stateService.go('login');
      }

      return $q.reject(response);
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
