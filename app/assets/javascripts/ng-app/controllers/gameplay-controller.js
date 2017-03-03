(function(ng) {
  "use strict";

  ng.module('GameApp').controller('GameplayController', ['$q', 'DataService', '$scope', function($q, DataService, $scope) {
    $scope.allTracks = [];
    $scope.userGuess = '';
    $scope.track="";
    $scope.artist="";
    $scope.correctguesses = 0;
    $scope.currentTrack = null;
    $scope.incorrectguesses = 0;
    $scope.index = 0;

    let index = 0;
    //create shuffle function
    const shuffle = function(array) {
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

  const calculateScore = function() {
    console.log('score count');
  }

  const compare = function(arg1, arg2) {
    console.log(arg1, "and",  arg2);
    $scope.currentTrack.pause();
    arg1 = arg1.toLowerCase();
    arg2 = arg2.toLowerCase();
    if (arg1 === arg2) {
      console.log('win');
      $scope.correctguesses++;
      $scope.index++;
    } else {
      $scope.incorrectguesses;
      $scope.index++;
      console.log('lose');
    }

    if ($scope.index === $scope.allTracks.length) {
      calculateScore();
      // send to leaderboard
      console.log('game-over');
    } else {
      playNext();
    }
  };

  // KEEP TRACK OF TIME AND RUN A LISTENER WITH SET INTERVAL TO WATCH FOR TIME END
  // OR NO TIME LEFT

    const playNext = function() {
      if ($scope.currentTrack) {
        console.log('in');
        $scope.artist = $scope.allTracks[$scope.index].artist;
        $scope.track = $scope.allTracks[$scope.index].preview_url;
        $scope.currentTrack = new Audio($scope.track);
        $scope.currentTrack.play();
      } else {
        $scope.artist = $scope.allTracks[$scope.index].artist;
        $scope.track = $scope.allTracks[$scope.index].preview_url;

        $scope.currentTrack = new Audio($scope.track);
        $scope.currentTrack.play();
      }
    }

    //retrieve allTracks from DataService
    $q.when(DataService.getTracks()).then((response) => {
      $scope.allTracks = response.data;
      console.log(response);
      shuffle($scope.allTracks);
      // play song 0 every time? or MathFloor(MathRandom again)?
    });

  }]);
})(angular);
