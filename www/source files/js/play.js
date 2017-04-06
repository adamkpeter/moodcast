app.controller('playController', function ($scope, $state, Spotify, $ionicModal, $http, $q, localStorageService, weatherService) { //store the entities name in a variable var taskData = 'task';

  var audioObject = new Audio("");
  //audioObject.play();

  $scope.contentLoaded = false;

  $scope.weather = "";
  $scope.index = -1;
  $scope.songQueue = [];
  $scope.playOrPause = "img/pause_button.png";

  audioObject.onended = function(){
    $scope.getNextSong();
  };

  $scope.pauseOrPlay = function(){
    if($scope.playOrPause == "img/pause_button.png"){
      $scope.playOrPause = "img/play_button.png";
      if(audioObject != null){
        audioObject.pause();
      }
    }
    else {
      $scope.playOrPause = "img/pause_button.png";
      if(audioObject != null){
        audioObject.play();
      }
    }
  };

  var getRecommendations = function(code){
    var date = new Date();

    $http({
      url:"http://ec2-52-37-193-231.us-west-2.compute.amazonaws.com/?ezreal=2ih4temylyfe4&weather="+code+
      "&time="+date.getHours()+"&liked=1&disliked=1&preferences=electronic|rock|pop|alternative|indie|metal",
      method: 'GET',
      transformResponse: [function (data) {
        return JSON.parse(data);
      }]
    }).then(function(res){

      angular.forEach(res.data, function(song){
        $scope.songQueue.push(song);
      });

      $q.all($scope.songQueue).then(function(){
        $scope.getNextSong();
      });
      //getSong($scope.songQueue[0].track, $scope.songQueue[0].artist);
    }, function(err){
      getSong("Here Comes the Sun", "The Beatles");
    });
  };

  weatherService.getLatAndLong().then(function(res){
    console.log("Got Latitude and Longitude");
    console.log(res);
    $scope.getWeather(res.latitude, res.longitude);
  }, function(err){
    console.log(err);
    $scope.getWeather(33.66642,-117.82604472907204);
  });


  $scope.getWeather = function(lat, long){
    weatherService.getWeather(lat, long).then(
      function(weather){
        getRecommendations(weather.code);
      },
      function(weatherErr){
        console.log(weatherErr);
        getRecommendations(32);
      }
    );
  };

  var getSong = function(track, artist){
    var deferred = $q.defer();

    Spotify.search(track, 'Track', {limit: 50}).then(function(data){
      var stop = false;
      for(var i = 0; i < data.tracks.items.length; i++){
        var item = data.tracks.items[i];
        if(item.artists[0].name == artist && !stop) {
          $scope.track = item;
          $scope.source = $scope.track.preview_url;
          audioObject = new Audio($scope.source);
          audioObject.play();
          stop = true;
          $scope.contentLoaded = true;
          deferred.resolve(true);
        }
        else if(i == data.tracks.items.length-1){
          deferred.resolve(false);
        }
      }
    });

    return deferred.promise;
  };


  $scope.goToMain = function(){
    $state.go('main');
  };

  $scope.getAlbums = function(){

  };

  $scope.getNextSong = function(){
    if(audioObject != null){
      audioObject.pause();
    }
    $scope.index++;
    getSong($scope.songQueue[$scope.index].track, $scope.songQueue[$scope.index].artist).then(function(res){
      if(!res){
        $scope.getNextSong();
      }
    })
  }

});

