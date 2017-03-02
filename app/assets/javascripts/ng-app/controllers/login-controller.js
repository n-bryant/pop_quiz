(function(ng) {
  "use strict";

  ng.module('GameApp').controller('LoginController', ['$scope', 'UserService', 'DataService', function($scope, UserService, DataService) {
    console.log(UserService);
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
