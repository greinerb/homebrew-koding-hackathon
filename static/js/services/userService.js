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
    update: function(userToStore)
    {
      console.log(userToStore);
      var user = {'_id':userToStore._id, 'username':userToStore.email, 'txtNum':userToStore.txtNum, 'voiceNum':userToStore.voiceNum, 'password':userToStore.pass};
      return $http({method: 'PUT', url: '/myflows/user/' + userToStore._id, data: user});
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
      return this.loggedin
    },
    setLoggedIn: function(val)
    {
      this.loggedin = val;
    }
  };
}]);
