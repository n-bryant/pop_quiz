(function(ng) {
  "use strict";

  ng.module('GameApp').controller('PickCategoryController', ['$scope', 'UserService', '$state', function($scope, UserService, $state) {
    $scope.session = UserService.sessionStatus();
    if (!$scope.session) {
      $state.go('GameParent.login');
    }

    $scope.user = UserService.getActiveUser();

    $scope.rules1 = true;
    $scope.rules2 = false;
  }]);
})(angular);
