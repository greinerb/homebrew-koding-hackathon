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

  $scope.open = function(size){
    console.log("in open");
      var modal = $uibModal.open({
      animation: true,
      templateUrl: 'templates/login-modal.html',
      size: size,
      controller: "ModalLoginInstanceCtrl",
      windowTopClass: "ModalWindow"
    });

    modal.result.then(function(user){
      console.log(user);
      User.validateLogin(user).then(function(response){//success
        console.log(response);
        //check response code, set loggedIn = true if successful.
      }).then(function(response){//error
        console.log(response);
        $scope.open();
      });
      console.log('Modal dismissed at: ' + new Date());
    });
  };
  return this;
}]);
app.controller('ModalLoginInstanceCtrl',["$scope", "$uibModalInstance", function($scope, $uibModalInstance){
  $scope.ok = function(){
    $uibModalInstance.close($scope.user);
  };

  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
  };
}]);
