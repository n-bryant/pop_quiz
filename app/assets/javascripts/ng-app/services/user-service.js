(function(ng) {
  "use strict";

  ng.module('GameApp').service('UserService', ['$q', '$state', function($q, $state) {
    this.activeUser;

    function validateUser(user) {
      console.log(user);
      // if request is good
        // this.activeUser = get user by user.id

      // else
        // present validation message to user
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
