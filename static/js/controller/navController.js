app.controller("NavController", ["$scope", "$uibModal", "User", function($scope, $uibModal, User){
  this.tabIndex = 1;
  $scope.loggedIn = false;

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
    User.validateLogin(user);
  }

  return this;
}]);
