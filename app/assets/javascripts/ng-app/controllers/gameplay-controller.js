(function(ng) {
  "use strict";

  ng.module('GameApp').controller('GameplayController', ['$q', 'DataService', '$scope', 'UserService', '$state', function($q, DataService, $scope, UserService, $state) {
    $scope.session = UserService.sessionStatus();
    if (!$scope.session) {
      $state.go('GameParent.login');
    } else {
      $scope.user = UserService.getActiveUser();
      console.log($scope.user);

      $scope.allTracks = [];
      $scope.index = 0;
      $scope.totalRounds = 0;
      $scope.userGuess = '';
      $scope.track="";
      $scope.artist="";
      $scope.correctguesses = 0;
      $scope.incorrectguesses = 0;
      $scope.score = 0;
      $scope.timeRemaining = 30;

      const guessForm = document.querySelector('.guess-form');

      let currentTrack = null;

      $scope.guess = function() {
          $scope.userGuess= event.target[0].value;
          compare($scope.artist, $scope.userGuess);
      };

    function calculateScore(guessStatus) {
      if (guessStatus) {
        $scope.score += (4 * $scope.timeRemaining);
        console.log($scope.score);
      } else {
        $scope.score -= 30;
        if ($scope.score < 0) {
          $scope.score = 0;
        }
        console.log($scope.score);
      }
    }

    function checkGameRound() {
      currentTrack.pause();
      if ($scope.index === $scope.allTracks.length) {
        $scope.user.score = $scope.score;
        UserService.updateUser($scope.user);
        storeGame($scope.user);
        $state.go('GameParent.leaderboard');
      } else {
        resetVisualTimer();
        $scope.timeRemaining = 30;
        playNext();
      }
    }

    function compare(arg1, arg2) {
      console.log(arg1, "and",  arg2);
      guessForm.reset();
      arg1 = arg1.toLowerCase();
      arg2 = arg2.toLowerCase();
      if (arg1 === arg2) {
        console.log('win');
        $scope.correctguesses++;
        $scope.index++;
        calculateScore(true);
        guessEval(true);
      } else {
        $scope.incorrectguesses++;
        $scope.index++;
        calculateScore(false);
        guessEval(false);
        compare
        console.log('lose');
      }
      checkGameRound();
    };

    //function to show/hide the guess evaluation text
    function guessEval(arg) {
      if (arg === true) {
        document.querySelector('.truth').style.color = "#39ff14";
        removeColor();
      } else {
        document.querySelector('.lies').style.color = "#ff073a";
        removeColor();
      }
    }

    function removeColor() {
      setTimeout(function(){
        document.querySelector('.truth').style.color = "transparent";
        document.querySelector('.lies').style.color = "transparent";
      }, 750);
    };

      function playNext() {
        if (currentTrack) {
          $scope.artist = $scope.allTracks[$scope.index].artist;
          $scope.track = $scope.allTracks[$scope.index].preview_url;

          currentTrack = new Audio($scope.track);
          console.log(currentTrack)
          currentTrack.play();
        } else {
          $scope.artist = $scope.allTracks[$scope.index].artist;
          $scope.track = $scope.allTracks[$scope.index].preview_url;

          currentTrack = new Audio($scope.track);
          console.log(currentTrack)
          currentTrack.play();
        }
        DataService.setSong(currentTrack);
      }

      function deleteVisualTimer() {
        let songBar = document.querySelector('.song-bar');
        let innerBar = document.querySelector('.disappearing-bar');
        let garbage = songBar.removeChild(innerBar);
      }

      function replaceVisualTimer() {
        let songBar = document.querySelector('.song-bar');
        let node = document.createElement('div');
        node.className += 'disappearing-bar';
        songBar.appendChild(node);
      }

      function resetVisualTimer() {
        deleteVisualTimer();
        replaceVisualTimer();
      }

      function storeGame(user) {
        $q.when(DataService.createGame(user)).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
      }

      function trackTime() {
        $scope.$apply(() => {$scope.timeRemaining--});
        // console.log($scope.timeRemaining);
        if ($scope.timeRemaining === 0) {
          // reset animation and start next song
          resetVisualTimer();
          $scope.timeRemaining = 30;
          $scope.index++;
          checkGameRound();
        }
      }
      window.setInterval(function(){trackTime()}, 1000);

      //retrieve allTracks from DataService
      $q.when(DataService.getTracks()).then((response) => {
        $scope.allTracks = response.data;
        $scope.totalRounds = $scope.allTracks.length;
        console.log($scope.allTracks);
        playNext();
      });
    }

  }]);
})(angular);
