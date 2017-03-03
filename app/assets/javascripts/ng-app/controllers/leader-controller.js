(function(ng) {
  "use strict";

  ng.module('GameApp').controller('LeaderController', ['UserService', '$scope', '$state', function(UserService, $scope, $state) {
    $scope.session = UserService.sessionStatus();
    if (!$scope.session) {
      $state.go('GameParent.login');
    }

    $scope.user = UserService.getActiveUser();

    this.updateTable = function(col) {
        this.orderByField = col;
        console.log(col);
    };

  }]);
})(angular);
