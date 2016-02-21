app.factory('User', ['$http', '$location', function UserFactory($http, $location){
  this.storedUser;

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
      return $http({method: 'GET', url: '/myflows/login'});
    },
    validateLogin: function(user)
    {
      $http({method: 'POST', url: '/myflows/login', data:{'username':user.email, 'password':user.password}}).success(function(data){
        console.log('success, storing');
        console.log(data);
        this.storedUser = data;
        console.log(this.storedUser);
        $location.path("/list");
        return data;
      });
    },
    getStoredUser: function()
    {
      console.log('returning promise');
      return this.storedUser;
    }
  };
}]);
