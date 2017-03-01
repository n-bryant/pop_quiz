(function(ng) {
  "use strict";

  ng.module('GameApp').service('UserService', ['$q', '$state', '$http', 'DataService', function($q, $state, $http, DataService) {
    this.activeUser;

    function validateUser(user, isNewUser) {
      console.log(user);
      if (isNewUser) {
        $q.when(DataService.createUser(user)).then((response) => {
          console.log(response);
          // this.activeUser = response.data.data;
          // $state.go('GameParent.profile');
        }).catch((error) => {
          console.log(error);
          // present validation message to user
        });
      } else {
        $q.when(DataService.logIn(user)).then((response) => {
          console.log(response);
          this.activeUser = response.data.data;
          $state.go('GameParent.profile');
        }).catch((error) => {
          // present validation message to user
          // this.unauthorized = error.data.errors[0];
        });
      }
    }

    return {
      validate: validateUser
    };
  }]);
})(angular);
