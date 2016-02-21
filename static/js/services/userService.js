app.factory('User', ['$http', '$location', function UserFactory($http, $location){
  this.loggedin = false;

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
      return $http({method: 'GET', url: '/myflows/activeUser'});
    },
    validateLogin: function(user)
    {
      return $http({method: 'POST', url: '/myflows/login', data:{'username':user.email, 'password':user.password}});
    },
    logout: function(user)
    {
      return $http({method: 'GET', url: '/myflows/logout'});
    },
    isLoggedIn: function()
    {
      console.log("reporting loggedin of " + this.loggedin);
      return this.loggedin
    },
    setLoggedIn: function(val)
    {
      console.log("setting loggedin to " + val);
      this.loggedin = val;
    }
  };
}]);
