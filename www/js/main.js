app.controller('mainController', function ($scope, $state, weatherService) { //store the entities name in a variable var taskData = 'task';



  $scope.goToPlay = function(){
    $state.go('play');
  }
});
