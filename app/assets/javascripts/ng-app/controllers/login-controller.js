(function(ng) {
  "use strict";

  ng.module('GameApp').controller('LoginController', function(UserService) {
    this.authenticate = function(username, password) {
      const user = {
        username: username,
        password: password
      };
      console.log(user);
      UserService.validate(user);
    };
  });
})(angular);
