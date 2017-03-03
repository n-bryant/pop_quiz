(function(ng) {
  "use strict";

  ng.module('GameApp').controller('ProfileController',  ['$state', '$scope', 'DataService', 'UserService', function($state, $scope, DataService, UserService) {
    // include orderByField to default sort scores
    $scope.orderByField = 'score';

    // add variable inside of user service of 'test'; reveal it; and see if it is accessible outside of the service
    console.log(UserService);

    // if !session do a $state.go to redirect to login; put an ng-show on nav
    $scope.session = UserService.sessionStatus();
    if (!$scope.session) {
      $state.go('GameParent.login');
    }

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

    //updateTable to sort by score or username
    $scope.updateTable = function(label) {
        $scope.orderByField = label;
        console.log(label);
    };

    $scope.logOut = function(user) {
      DataService.logOut(user);
    }
  }]);
})(angular);
