app.controller('playController', function ($scope, $state, Spotify, $ionicModal, $http, localStorageService, weatherService) { //store the entities name in a variable var taskData = 'task';

  var audioObject;// = new Audio("https://p.scdn.co/mp3-preview/70571de42bc2e10e2e12832416beb193b364787e?cid=null");
  //audioObject.play();

  $scope.contentLoaded = false;

  $http({
    url:"http://ec2-52-37-193-231.us-west-2.compute.amazonaws.com/?ezreal=2ih4temylyfe4&weather=31&time=14&liked=1&disliked=1&preferences=electronic",
    method: 'GET',
    transformResponse: [function (data) {
      console.log(data);
      return data;
    }]
  }).then(function(res){
    console.log(res);
  }, function(err){
    console.log(err);
  });

  // $http.get(
  //   "http://ec2-52-37-193-231.us-west-2.compute.amazonaws.com/?ezreal=2ih4temylyfe4&weather=sun&time=day&liked=1&disliked=1&preferences=electronic|chill").then(
  //   function(res){
  //     console.log("help");
  //     console.log(res);
  //   }, function(err){
  //     console.log(err);
  //   });


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
    getSong();
  });


  var getSong = function(){
    Spotify.search('Another Day of Sun', 'Track').then(function(data){
      $scope.track = data.tracks.items[0];
      console.log($scope.track);
      $scope.source = $scope.track.preview_url;

      $scope.contentLoaded = true;
      //angular.element(document.querySelector('#loading')).html = "";
      //audioObject.play();
    });
  };

  $scope.goToMain = function(){
    $state.go('main');
  };

  $scope.getAlbums = function(){

  };


});

