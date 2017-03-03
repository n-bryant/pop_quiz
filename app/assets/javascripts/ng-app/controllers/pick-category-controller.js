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
      $scope.allCategories = response.data;
    }).catch((error) => {
      console.log(error);
    });

    $scope.setUserCategory = function(random, categoryId) {
      if (random) {
        categoryId = Math.floor(Math.random() * $scope.allCategories.length);
        if (categoryId === 0) {
          categoryId = 1;
        }
        $scope.user.category = categoryId;
      } else {
        $scope.user.category = categoryId;
      }
      UserService.updateUser($scope.user);
      $state.go('GameParent.gameplay');
    }
  }]);
})(angular);
