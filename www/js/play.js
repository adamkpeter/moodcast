app.controller('playController', function ($scope, $state, Spotify, $ionicModal, localStorageService, $cordovaGeolocation) { //store the entities name in a variable var taskData = 'task';

  var audioObject;// = new Audio("https://p.scdn.co/mp3-preview/70571de42bc2e10e2e12832416beb193b364787e?cid=null");
  //audioObject.play();
  $scope.track;
  $scope.longitude;
  $scope.latitude;

  // document.addEventListener("deviceready", function () {
  //   console.info('deviceready fired!');
  //   window.navigator.geolocation.getCurrentPosition(function(position) {
  //     console.info('Location from Cordova:');
  //     console.info("Latitude: " + position.coords.latitude + "; Longitude: " + position.coords.longitude);
  //   });
  // });

  $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
    .then(function(position){
      console.log(position);
      $scope.longitude = position.longitude;
      $scope.latitude = position.latitude;
    });

  Spotify.search('Girl', 'Track').then(function(data){
    console.log(data);
    $scope.track = data.tracks.items[0];
    console.log($scope.track);
    var audioObject = new Audio($scope.track.preview_url);
    //audioObject.play();
  });

  $scope.goToMain = function(){
    $state.go('main');
  };

  $scope.getAlbums = function(){

  };


});

