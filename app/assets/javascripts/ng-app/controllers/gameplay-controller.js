(function(ng) {
  "use strict";

  ng.module('GameApp').controller('GameplayController', ['$q', 'DataService', '$scope', function($q, DataService, $scope) {
    $scope.allTracks = [];
    $scope.userGuess = '';
    $scope.track="";
    $scope.artist="";

    let index = 0;
    //create shuffle function
    const shuffle = function(array) {
      let newArray = [];
      for (let i = array.length; i>0; i--) {
        let j = Math.floor(Math.random() * (array.length));
        newArray.push(array[j]);
        array.splice(j, 1);
        }
        console.log(newArray[index]);
        $scope.artist = newArray[index].artist;
        $scope.track = newArray[index].preview_url;
        play($scope.track);

      }

  $scope.guess = function() {
        $scope.userGuess= event.target[0].value;
        compare($scope.artist, $scope.userGuess);
    };

  const compare = function(arg1, arg2) {
    console.log(arg1, "and",  arg2);
    arg1 = arg1.toLowerCase();
    arg2 = arg2.toLowerCase();
    if (arg1 == arg2) {
      console.log('win');
      
    } else {
      console.log('lose');
    }
  };

    const play = function(url) {
      var a = new Audio(url);
      a.play();
    }

    //retrieve allTracks from DataService
    $q.when(DataService.getTracks()).then((response) => {
      $scope.allTracks = response.data;
      shuffle($scope.allTracks);
      // play song 0 every time? or MathFloor(MathRandom again)?
    });





  }]);
})(angular);
