app.factory('User', ['$http', function UserFactory($http){
  return {
    one: function(userName){
      console.log("get one user: " + username);
    },
    store: function(userToStore)
    {
      console.log(userToStore);
    },
    loggedInUser: function()
    {
      console.log("returning logged in user");
    },
    validateLogin: function(user)
    {
      return $http({method: 'POST', url: '', data:{'username':user.email, 'password':user.password}});
    }
  };
}]);
