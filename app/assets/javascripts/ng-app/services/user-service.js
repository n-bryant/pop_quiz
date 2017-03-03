(function(ng) {
  "use strict";

  ng.module('GameApp').service('UserService', ['$q', '$state', '$http', 'DataService', function($q, $state, $http, DataService) {
    let activeUser;
    let session = false;

    function getActiveUser() {
      return activeUser;
    }

    function getSessionStatus() {
      return session;
    }

    function validateUser(user, isNewUser) {
      if (isNewUser) {
        $q.when(DataService.createUser(user)).then((response) => {
          activeUser = response.data.data;
          let headers = response.headers();
          activeUser.accessToken = headers["access_token"];
          activeUser.client = headers["client"];
          session = true;
          $state.go('GameParent.profile');
        }).catch((error) => {
          console.log(error);
          // present validation message to user
        });
      } else {
        $q.when(DataService.logIn(user)).then((response) => {
          activeUser = response.data.data;
          let headers = response.headers();
          activeUser.accessToken = headers["access_token"];
          activeUser.client = headers["client"];
          session = true;
          $state.go('GameParent.profile');
        }).catch((error) => {
          // present validation message to user
          // this.unauthorized = error.data.errors[0];
        });
      }
    }

    return {
      getActiveUser: getActiveUser,
      sessionStatus: getSessionStatus,
      validate: validateUser
    };
  }]);
})(angular);
