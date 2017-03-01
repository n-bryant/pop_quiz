(function(ng) {
  "use strict";

  ng.module('GameApp').service('DataService', ['$http', function($http) {
    const baseUrl = 'https://lit-thicket-50639.herokuapp.com/';

    function createGame(userId) {
      return $http ({
        method: 'POST',
        url: `${baseUrl}games`,
        headers: {
          'Content-Type': 'string; default-value: application/json;charset=utf-8'
        },
        data: {
          user_id: userId
        }
      });
    }

    function createUser(newUser) {
      return $http ({
        method: 'POST',
        url: `${baseUrl}auth`,
        headers: {
          'Content-Type': 'string; default-value: application/json;charset=utf-8'
        },
        data: {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          password_confirmation: newUser.confirm
        }
      });
    }

    function deleteUser(userId) {
      return $http ({
        method: 'DELETE',
        url: `${baseUrl}/users/${userId}`,
        headers: {
          'Content-Type': 'string; default-value: application/json;charset=utf-8'
        }
      });
    }

    function getTracks() {
      return $http ({
        method: 'GET',
        url: `${baseUrl}tracks`
      });
    }

    function getUsers() {
      return $http ({
        method: 'GET',
        url: `${baseUrl}users`
      });
    }

    function getUserById(userId) {
      return $http ({
        method: 'GET',
        url: `${baseUrl}users/${userId}`
      });
    }

    function logInUser(user) {
      return $http ({
        method: 'POST',
        url: `${baseUrl}auth/sign_in`,
        headers: {
          'Content-Type': 'string; default-value: application/json;charset=utf-8'
        },
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
        headers: {
          'Content-Type': 'string; default-value: application/json;charset=utf-8'
        },
        data: {
          uid: user.uid,
          client: user.client,
          accessToken: user.accessToken
        }
      });
    }

    return {
      createUser: createUser,
      logIn: logInUser,
      logOut: logOutUser
    };
  }]);
})(angular);
