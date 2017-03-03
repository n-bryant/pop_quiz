(function(ng) {
  "use strict";

  ng.module('GameApp').controller('PickCategoryController', ['$scope', 'UserService', '$state', 'DataService', '$q', function($scope, UserService, $state, DataService, $q) {
    $scope.session = UserService.sessionStatus();
    if (!$scope.session) {
      $state.go('GameParent.login');
    }

    $scope.user = UserService.getActiveUser();

    $scope.rules1 = true;
    $scope.rules2 = false;

    // set category on user and push user data to UserService
    $q.when(DataService.getCategories()).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }]);
})(angular);
