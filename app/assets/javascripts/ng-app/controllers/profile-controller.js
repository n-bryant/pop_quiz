(function(ng) {
  "use strict";

  ng.module('GameApp').controller('ProfileController', ['$state', function($state) {
    console.log('in');
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
