(function(ng) {
  "use strict";

  ng.module('GameApp').controller('PickCategoryController', ['$scope', function($scope) {
    $scope.rules1 = true;
    $scope.rules2 = false;
  }]);
})(angular);
