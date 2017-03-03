(function(ng) {
  "use strict";

  ng.module('GameApp').controller('ProfileController',  ['$state', '$scope', 'DataService', 'UserService', function($state, $scope, DataService, UserService) {
    // if !session do a $state.go to redirect to login; put an ng-show on nav
    $scope.session = UserService.sessionStatus();
    if (!$scope.session) {
      $state.go('GameParent.login');
    }

    $scope.user = UserService.getActiveUser();
    console.log($scope.user);

    //function to welcome this user
    //return new value for this.user
    $scope.goPlay = function() {
      $state.go('GameParent.pickCategory');
    };

    $scope.sendMessage = function() {
      let message = event.target[0].value;
      console.log(message);
    };

    $scope.updateTable = function(col) {
        $scope.orderByField = col;
        console.log(col);
      };

    $scope.logOut = function(user) {
      DataService.logOut(user);
    }
  }]);
})(angular);
