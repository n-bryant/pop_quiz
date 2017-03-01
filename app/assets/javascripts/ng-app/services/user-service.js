(function(ng) {
  "use strict";

  ng.module('GameApp').service('UserService', ['$q', '$state', '$http', 'DataService', function($q, $state, $http, DataService) {
    this.activeUser;

    function validateUser(user) {
      console.log(user);
      $q.when(DataService.logIn(user)).then((response) => {
        console.log(response);
        // if request is good
          // this.activeUser = get user by user.id
      }).catch((error) => {
        console.log(error);
        // else
          // present validation message to user
      });
    }

    function getUser() {
      // make data request for user information
      // return user data that matches argument
    }

    return {
      validate: validateUser
    };
  }]);
})(angular);
