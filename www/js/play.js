app.controller('playController', function ($scope, $state, $ionicModal, localStorageService) { //store the entities name in a variable var taskData = 'task';


  $scope.goToMain = function(){
    $state.go('main');
  }



});

