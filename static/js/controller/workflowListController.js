app.controller("WorkflowListController", ["Workflow", "User", "$scope", "$uibModal", function(Workflow, User, $scope, $uibModal){

  var getWorkflow = function(workflowId)
  {
    Workflow.one(workflowId);
  };

  var getMyWorkflows = function()
  {
    console.log('getMyWorkflows');
    //get user id
    User.loggedInUser();
    //get workflow ID or workflows?
    Workflow.byUser('user id');
    return [{"id":1, "title":"This is a workflow title.", "description":"This is a more elaborate description of the workflow", "start":"2016-02-20 15:00:00", "end":"2016-02-20 22:00:00", "status":"In Progress"},
    {"id":2, "title":"This is a workflow title.", "description":"This is a more elaborate description of the workflow", "start":"2016-02-20 15:00:00", "end":"2016-02-20 22:00:00", "status":"In Progress"},
    {"id":3, "title":"This is a workflow title.", "description":"This is a more elaborate description of the workflow", "start":"2016-02-20 15:00:00", "end":"2016-02-20 22:00:00", "status":"In Progress"}];
  };
  var num = 4;
  $scope.workflows = getMyWorkflows();

  $scope.open = function(size){
    var modal = $uibModal.open({
      animation: true,
      templateUrl: 'templates/workflow-modal.html',
      size: size,
      controller: "ModalInstanceCtrl",
      windowTopClass: "ModalWindow"
    });

    modal.result.then(function(workflow){
      console.log(workflow);
      workflow.status="New";
      $scope.workflows.push(workflow);
      console.log('Modal dismissed at: ' + new Date());
    });
  };
}]);

app.controller('ModalInstanceCtrl',["$scope", "$uibModalInstance", function($scope, $uibModalInstance){
  $scope.ok = function(){
    $uibModalInstance.close($scope.workflow);
  };

  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
  };
}]);
