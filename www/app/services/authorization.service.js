angular.module('homemade')
  .factory('Authorization', function () {

    var userModel = {};

    function isAuthorized() {
      // TODO: change if you want to get better authorization or compartmentalization system.
      if (userModel){
        return true;
      }
      return false;
    };

    function setUser(user) {
      userModel = user;
    };

    function getUser() {
      return userModel;
    };


    return {
      isAuthorized: isAuthorized,
      setUser: setUser,
      getUser: getUser
    };
  });
