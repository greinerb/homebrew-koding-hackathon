app.controller("UserController", ["User", function(User){

  this.saveUser = function(userToStore)
  {
    User.store(userToStore);
  }

  this.getUser = function(userId)
  {
    var user = User.one(userId);
    if(user)
    {
      return user;
    }
    return {};
  }

  return this;
}]);
