app.factory('User', ['$http', function UserFactory($http){
  return {
    one: function(userName){
      console.log("get one user: " + username);
    },
    store: function(userToStore)
    {
      console.log(userToStore);
      var user = {'username':userToStore.email, 'password':userToStore.pass, 'txtNum':userToStore.txtNum, 'voiceNum':userToStore.voiceNum};
      return $http({method: 'PUT', url: '/myflows/user', data: user});
    },
    loggedInUser: function()
    {
      console.log("returning logged in user");
    },
    validateLogin: function(user)
    {
      return $http({method: 'POST', url: '/myflows/login', data:{'username':user.email, 'password':user.password}});
    }
  };
}]);
