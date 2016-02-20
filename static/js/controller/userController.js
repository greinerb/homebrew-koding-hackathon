app.controller("UserController", ["User", function(User){

  this.saveUser = function(userToStore)
  {
    User.store(userToStore);
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
