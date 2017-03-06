(function(ng) {
  "use strict";

  ng.module('GameApp').controller('ProfileController',  ['$state', '$scope', 'DataService', 'UserService', '$q', function($state, $scope, DataService, UserService, $q) {
    // include orderByField to default sort scores
    $scope.orderByField = 'score';

    // if !session do a $state.go to redirect to login; put an ng-show on nav
    $scope.session = UserService.sessionStatus();
    if (!$scope.session) {
      $state.go('GameParent.login');
    }

    $scope.user = UserService.getActiveUser();

    $scope.userGames = [];
    // fetch the user's game data
    $q.when(DataService.games()).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].user.id === $scope.user.id) {
          $scope.userGames.push(response.data[i]);
        }
      }
    }).catch((error) => {
      console.log(error);
    });

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
      $state.go('GameParent.login');
    }
    $scope.delete = function(user) {
      $q.when(DataService.delete(user)).then((response) => {
        console.log(response);
        $state.go('GameParent.login');
      });
    }
  }]);
})(angular);
