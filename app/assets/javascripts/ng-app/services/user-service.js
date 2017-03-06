(function(ng) {
  "use strict";

  ng.module('GameApp').service('UserService', ['$q', '$state', '$http', 'DataService', function($q, $state, $http, DataService) {
    let activeUser;
    let session = false;
    let isValid;

    function getActiveUser() {
      return activeUser;
    }

    function getSessionStatus() {
      return session;
    }

    function getValidStatus() {
      return isValid;
    }

    function updateUser(user) {
      activeUser = user;
      console.log(activeUser);
    }

    function validateUser(user, isNewUser) {
      if (isNewUser) {
        $q.when(DataService.createUser(user)).then((response) => {
          activeUser = response.data.data;
          if (activeUser.image === '/assets/images/default.jpg') {
            activeUser.image = 'http://bit.ly/2m68mXr';
          }
          let headers = response.headers();
          activeUser.accessToken = headers["access_token"];
          activeUser.client = headers["client"];
          session = true;
          isValid = true;
          $state.go('GameParent.profile');
        }).catch((error) => {
          console.log(error);
          isValid = false;
        });
      } else {
        $q.when(DataService.logIn(user)).then((response) => {
          activeUser = response.data.data;
          if (activeUser.image === '/assets/images/default.jpg') {
            activeUser.image = 'http://bit.ly/2m68mXr';
          }
          let headers = response.headers();
          activeUser.accessToken = headers["access_token"];
          activeUser.client = headers["client"];
          session = true;
          isValid = true;
          $state.go('GameParent.profile');
        }).catch((error) => {
          console.log(error);
          isValid = false;
        });
      }
    }

    return {
      getActiveUser: getActiveUser,
      updateUser: updateUser,
      sessionStatus: getSessionStatus,
      validate: validateUser,
      validStatus: getValidStatus
    };
  }]);
})(angular);
