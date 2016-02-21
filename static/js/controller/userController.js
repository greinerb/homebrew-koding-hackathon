app.controller("UserController", ["User", function(User){

  this.saveUser = function(userToStore)
  {
    User.store(userToStore).then(function successCallback(response){//success
      console.log('success');
      console.log(response);
    }, function errorCallback(response){//error
      console.log("error");
      console.log(response);
    });
  };

  this.getUser = function(userId)
  {
    return User.one(userId);
  };

  this.getLoggedInUser = function()
  {
    return User.loggedInUser();
  };

  return this;
}]);
