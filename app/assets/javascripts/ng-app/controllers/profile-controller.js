(function(ng) {
  "use strict";

  ng.module('GameApp').controller('ProfileController',  ['$state','DataService', function($state, DataService) {
    this.user = '';

    console.log(DataService.getUsers());
    //function to welcome this user
    //return new value for this.user
    this.goPlay = function() {
      $state.go('GameParent.pickCategory');
    };

    this.sendMessage = function() {
      let message = event.target[0].value;
      console.log(message);
    };

    this.updateTable = function(col) {
        this.orderByField = col;
        console.log(col);
      };
  }]);
})(angular);
