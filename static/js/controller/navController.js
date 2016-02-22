app.controller("NavController", ["$scope", "$uibModal", "User", "$location", function($scope, $uibModal, User, $location){
  this.tabIndex = 1;
  $scope.isUserLoggedIn = false;

  this.isLoggedIn = function()
  {
    var retVal = User.isLoggedIn();
    return retVal;
  };

  this.isSet = function(tab)
  {
    return tab === this.tabIndex;
  };

  this.setTab = function(tab)
  {
    this.tabIndex = tab;
  };

  this.validateLogin = function(user)
  {
    $scope.isUserLoggedIn = User.validateLogin(user).success(function(data){
      $location.path("/list");
      User.setLoggedIn(true);
      return true;
    });
  };

  this.logout = function()
  {
    this.setTab(2);
    User.logout().success(function(data){
      console.log('logged out');
      console.log(data);
      User.setLoggedIn(false);
      $scope.$apply();
    });
  };

  return this;
}]);
