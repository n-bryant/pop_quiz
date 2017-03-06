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
      $scope.userGuess = '';
      $scope.track="";
      $scope.artist="";
      $scope.correctguesses = 0;
      $scope.incorrectguesses = 0;
      $scope.score = 0;
      $scope.timeRemaining = 30;

      const guessForm = document.querySelector('.guess-form');

      let index = 0;
      let currentTrack = null;

      function shuffle(array) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
          let j = Math.floor(Math.random() * (array.length));
          newArray.push(array[j]);
          array.splice(j, 1);
        }
          console.log(newArray);
          $scope.allTracks = newArray;
          playNext();
      }

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
      if (index === $scope.allTracks.length) {
        $scope.user.score = $scope.score;
        UserService.updateUser($scope.user);
        storeGame($scope.user);
        $state.go('GameParent.leaderboard');
      } else {
        currentTrack.pause();
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
        index++;
        calculateScore(true);
        guessEval(true);
      } else {
        $scope.incorrectguesses++;
        index++;
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
          $scope.artist = $scope.allTracks[index].artist;
          $scope.track = $scope.allTracks[index].preview_url;

          currentTrack = new Audio($scope.track);
          console.log(currentTrack)
          currentTrack.play();
        } else {
          $scope.artist = $scope.allTracks[index].artist;
          $scope.track = $scope.allTracks[index].preview_url;

          currentTrack = new Audio($scope.track);
          console.log(currentTrack)
          currentTrack.play();
        }
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
          index++;
          checkGameRound();
        }
      }
      window.setInterval(function(){trackTime()}, 1000);

      //retrieve allTracks from DataService
      $q.when(DataService.getTracks()).then((response) => {
        $scope.allTracks = response.data;
        console.log($scope.allTracks);
        playNext();
      });
    }
  }]);
})(angular);
