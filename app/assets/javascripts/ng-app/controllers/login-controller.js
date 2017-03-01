(function(ng) {
  "use strict";

  ng.module('GameApp').controller('LoginController', ['$scope', 'UserService', function($scope, UserService) {
    $scope.authenticate = function() {
      const user = {
        username: this.username,
        password: this.password
      };
      UserService.validate(user);
    };
  }]);
})(angular);
