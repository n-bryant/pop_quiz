(function(ng) {
  "use strict";

  ng.module('GameApp').controller('LoginController', ['$scope', 'UserService', function($scope, UserService) {
    $scope.authenticate = function() {
      const user = {
        username: this.username,
        password: this.password
      };
      console.log(user);
      UserService.validate(user);
    };
  }]);
})(angular);
