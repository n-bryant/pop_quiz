(function(ng) {
  "use strict";

  ng.module('GameApp').controller('LeaderController', [function() {

    this.updateTable = function(col) {
        this.orderByField = col;
        console.log(col);
    };

  }]);
})(angular);
