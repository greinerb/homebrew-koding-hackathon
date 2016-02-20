app.factory('User', ['$http', function UserFactory($http){
  return {
    one: function(userName){
      console.log("get one user: " + username);
    },
    store: function(userToStore)
    {
      console.log(userToStore);
    }
  };
}]);