(function(ng) {
  "use strict";

  ng.module('GameApp').controller('ProfileController',  ['$state', '$scope', 'DataService', 'UserService', function($state, $scope, DataService, UserService) {
    // if !session do a $state.go to redirect to login

    // add variable inside of user service of 'test'; reveal it; and see if it is accessible outside of the service
    console.log(UserService);

    $scope.user = UserService.getActiveUser();
    console.log($scope.user);

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
