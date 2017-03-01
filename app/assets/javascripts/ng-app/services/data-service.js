(function(ng) {
  "use strict";

  ng.module('GameApp').service('DataService', ['$http', function($http) {
    const baseUrl = 'https://lit-thicket-50639.herokuapp.com/';

    function logInUser(user) {
      return $http ({
        method: 'POST',
        url: `${baseUrl}auth/sign_in`,
        headers: 'string; default-value: application/json;charset=utf-8',
        data: {
          email: user.username,
          password: user.password
        }
      });
    }

    function logOutUser(user) {
      return $http ({
        method: 'DELETE',
        url: `${baseUrl}auth/sign_out`,
        headers: 'string; default-value: application/json;charset=utf-8',
        data: {
          uid: user.uid,
          client: user.client,
          accessToken: user.accessToken
        }
      });
    }

    return {
      logIn: logInUser
    };
  }]);
})(angular);
