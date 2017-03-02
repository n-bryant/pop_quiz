(function(ng) {
  "use strict";

  ng.module('GameApp').controller('ProfileController',  ['$state','UserService', function($state, UserService) {


    this.user = UserService.getActiveUser();
    console.log(this.user);

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
