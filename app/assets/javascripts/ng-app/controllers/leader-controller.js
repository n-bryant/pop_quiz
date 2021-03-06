(function(ng) {
  "use strict";

  ng.module('GameApp').controller('LeaderController', ['$q', 'DataService', '$scope', 'UserService', '$state', function($q, DataService, $scope, UserService, $state) {
    $scope.session = UserService.sessionStatus();
    if (!$scope.session) {
      $state.go('GameParent.login');
    }
    $scope.count = 0;

    $scope.user = UserService.getActiveUser();

    $scope.gameData = [];
    // include orderByField to default sort scores
    $scope.orderByField = 'score';

    // use DataService to pull in scores and store in empty gameData array
    $q.when(DataService.games()).then((response) => {
      console.log(response.data);
      $scope.gameData = response.data;
    });

    // counter function to increment for each new row we create on the leaderboard

    //updateTable to sort by score or username
    $scope.updateTable = function(label) {
        $scope.orderByField = label;
        console.log(label);
    };

  }]);
})(angular);
