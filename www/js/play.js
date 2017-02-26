app.controller('playController', function ($scope, $state, Spotify, $ionicModal, localStorageService) { //store the entities name in a variable var taskData = 'task';

  var audioObject;// = new Audio("https://p.scdn.co/mp3-preview/70571de42bc2e10e2e12832416beb193b364787e?cid=null");
  //audioObject.play();
  $scope.track;

  Spotify.search('Fade to Black', 'Track').then(function(data){
    console.log(data);
    $scope.track = data.tracks.items[0];
    console.log($scope.track);
    var audioObject = new Audio($scope.track.preview_url);
    audioObject.play();
  });

  $scope.goToMain = function(){
    $state.go('main');
  };

  $scope.getAlbums = function(){

  };


});

