app.controller('playController', function ($scope, $state, Spotify, $ionicModal, localStorageService, weatherService) { //store the entities name in a variable var taskData = 'task';

  var audioObject;// = new Audio("https://p.scdn.co/mp3-preview/70571de42bc2e10e2e12832416beb193b364787e?cid=null");
  //audioObject.play();


  weatherService.getLatAndLong().then(function(res){
    console.log("Got Latitude and Longitude");
    console.log(res);
    weatherService.getWeather(res.latitude, res.longitude).then(function(weather){
      console.log("Got weather");
      console.log(weather);
      getSong();
    }, function(weatherErr){
      console.log(weatherErr);
    })
  }, function(err){
    console.log(err);
  });


  var getSong = function(){
    Spotify.search('Another Day of Sun', 'Track').then(function(data){
      $scope.track = data.tracks.items[0];
      console.log($scope.track);
      $scope.source = $scope.track.preview_url;

      angular.element(document.querySelector('#loading')).html = "";
      //audioObject.play();
    });
  };

  $scope.goToMain = function(){
    $state.go('main');
  };

  $scope.getAlbums = function(){

  };


});

