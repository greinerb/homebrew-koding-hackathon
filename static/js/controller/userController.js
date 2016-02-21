app.controller("UserController", ["User", "$scope", "$location", function(User, $scope, $location){

  $scope.user = {};
  $scope.existing = false;

  this.getLoggedInUser = function()
  {
    User.loggedInUser().success(function(data){
      console.log(data);
      User.setLoggedIn(true);
      $scope.user = {'_id':data._id, 'email':data.username, 'txtNum':data.txtNum, 'voiceNum':data.voiceNum};
      $scope.existing = true;
    });
  };

  this.getLoggedInUser();

  this.saveUser = function(userToStore)
  {
    if(userToStore._id)
    {
      User.update(userToStore).then(function successCallback(response){//success
        console.log('success');
        console.log(response);
        $location.path("/list");
      }, function errorCallback(response){//error
        console.log("error");
        console.log(response);
      });
    }
    else
    {
      User.store(userToStore).then(function successCallback(response){//success
        console.log('success');
        console.log(response);
        $location.path("/list");
      }, function errorCallback(response){//error
        console.log("error");
        console.log(response);
      });
    }
  };

  this.getUser = function(userId)
  {
    return User.one(userId);
  };

  return this;
}]);
