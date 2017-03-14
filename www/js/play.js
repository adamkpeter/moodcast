app.controller('playController', function ($scope, $state, Spotify, $ionicModal, $http, localStorageService, weatherService) { //store the entities name in a variable var taskData = 'task';

  var audioObject;// = new Audio("https://p.scdn.co/mp3-preview/70571de42bc2e10e2e12832416beb193b364787e?cid=null");
  //audioObject.play();

  $scope.contentLoaded = false;

  $scope.weather = "";

  // $http.get(
  //   "http://ec2-52-37-193-231.us-west-2.compute.amazonaws.com/?ezreal=2ih4temylyfe4&weather=sun&time=day&liked=1&disliked=1&preferences=electronic|chill").then(
  //   function(res){
  //     console.log("help");
  //     console.log(res);
  //   }, function(err){
  //     console.log(err);
  //   });

  var getRecommendations = function(code){
    var date = new Date();
    $http({
      url:"http://ec2-52-37-193-231.us-west-2.compute.amazonaws.com/?ezreal=2ih4temylyfe4&weather="+code+
      "&time="+date.getHours()+"&liked=1&disliked=1&preferences=electronic|rock|pop|alternative|indie|metal",
      method: 'GET',
      transformResponse: [function (data) {
        console.log(data);
        return data;
      }]
    }).then(function(res){
      console.log(res);
      getSong("Little Secrets", "Passion Pit");
    }, function(err){
      console.log(err);
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
    Spotify.search(track, 'Track', {limit: 50}).then(function(data){
      var stop = false;
      angular.forEach(data.tracks.items, function(item){
        if(item.artists[0].name == artist && !stop) {
          console.log(item);
          $scope.track = item;
          $scope.source = $scope.track.preview_url;
          stop = true;
          $scope.contentLoaded = true;
        }
      });
    });
  };

  $scope.goToMain = function(){
    $state.go('main');
  };

  $scope.getAlbums = function(){

  };


});

