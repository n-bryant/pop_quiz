(function(ng) {
  "use strict";

  ng.module('GameApp').controller('SignupController', ['$scope', 'UserService', function($scope, UserService) {
    $scope.pwdsNotMatched;

    $scope.createNewUser = function () {
      if (this.password === this.confirm) {
        $scope.pwdsNotMatched = false;
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm
        }
        UserService.validate(user, true);
      } else {
        $scope.pwdsNotMatched = true;
      }
    };
  }]);
})(angular);
