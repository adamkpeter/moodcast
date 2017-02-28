app.controller('mainController', function ($scope, $state, weatherService) { //store the entities name in a variable var taskData = 'task';

  weatherService.getWeather().then(function(res){
    console.log(res);
  });


  $scope.goToPlay = function(){
    $state.go('play');
  }
});
