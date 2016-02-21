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
      User.validateLogin(user).then(function successCallback(response){//success
        console.log(response);
        console.log(response.data);
        if(response.status === 200)
        {
          console.log('200 response, user logged in');
          loggedIn = true;
          //$rootScope.userId =
        }
        //check response code, set loggedIn = true if successful.
      }, function errorCallback(response){//error
        console.log(response);
        console.log(response.data);
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
