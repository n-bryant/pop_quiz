(function(ng) {
  "use strict";

  ng.module('GameApp').service('DataService', ['$http', function($http) {
    // 'https://lit-thicket-50639.herokuapp.com/'
    const baseUrl = 'http://localhost:3000/';
    this.playingSong = null;

    function createGame(user) {
      return $http ({
        method: 'POST',
        url: `${baseUrl}games`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({
          user_id: user.id,
          score: user.score,
          category_id: user.category
        })
      });
    }

    function createUser(newUser) {
      return $http ({
        method: 'POST',
        url: `${baseUrl}auth`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({
          username: newUser.username,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          password_confirmation: newUser.confirm
        })
      });
    }

    function deleteUser(user) {
      console.log(user);
      return $http ({
        method: 'DELETE',
        url: `${baseUrl}auth`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({
          uid: user.uid,
          client: user.client,
          access_token: user.accessToken
        })
      });
    }

    function getTracks() {
      return $http ({
        method: 'GET',
        url: `${baseUrl}tracks`
      });
    }

    function getCategories() {
      return $http ({
        method: 'GET',
        url: `${baseUrl}categories`
      });
    }

    function getUsers() {
      return $http ({
        method: 'GET',
        url: `${baseUrl}users`
      });
    }

    function getGames() {
      return $http ({
        method: 'GET',
        url: `${baseUrl}games`
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
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({
          email: user.username,
          password: user.password
        })
      });
    }

    function logOutUser(user) {
      return $http ({
        method: 'DELETE',
        url: `${baseUrl}auth/sign_out`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({
          uid: user.uid,
          client: user.client,
          access_token: user.accessToken
        })
      });
    }

    function setSong(song) {
      this.playingSong = song;
    }

    return {
      createUser: createUser,
      createGame: createGame,
      getUsers: getUsers,
      getCategories: getCategories,
      logIn: logInUser,
      logOut: logOutUser,
      getTracks: getTracks,
      games: getGames,
      delete: deleteUser,
      setSong: setSong
    };
  }]);
})(angular);
