app.controller("NavController", [function($scope){
  this.tabIndex = 1;

  this.isSet = function(tab)
  {
    return tab === this.tabIndex;
  };

  this.setTab = function(tab)
  {
    this.tabIndex = tab;
  };

  return this;
}]);
