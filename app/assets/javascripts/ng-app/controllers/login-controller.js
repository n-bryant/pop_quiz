(function(ng) {
  "use strict";

  ng.module('GameApp').controller('LoginController', ['$scope', 'UserService', 'DataService', '$q', function($scope, UserService, DataService, $q) {
    $scope.validUser = false;
    $scope.authenticate = function() {
      const user = {
        username: this.username,
        password: this.password
      };

      $q.when(UserService.validate(user)).then((response) => {
        $scope.$watch('validUser', () => {
          $scope.validUser = UserService.validStatus();
          console.log(UserService.validStatus());
        });
      }).catch((error) => {
        console.log(error);
      });
    };
  }]);
})(angular);
