app.controller("UserController", ["User", function(User){

  this.saveUser = function(userToStore)
  {
    User.store(userToStore);
  }

  return this;
}]);
