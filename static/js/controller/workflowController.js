app.controller("WorkflowController", ["$scope","Workflow", function($scope,Workflow){

  this.saveWorkflow = function(workFlowToStore)
  {
    Workflow.store(workFlowToStore);
  }

  this.getWorkflow = function(workflowId)
  {
    var workflow = Workflow.one(workflowId);
    if(workflow)
    {
      return workflow;
    }
    return {};
  }

  var getWorkflows = function(userId)
  {
    //get the workflows for a user
    var workflows = Workflow.byUser(userId);

    //loop over the workflows and get all the children
    if(workflows)
    {
      for(i = 0; i < workflows.length; i++)
      {
        if($scope.workflowlist)
        {
          $scope.workflowlist.push(workflows[i]);
        }
        else
        {
          $scope.workflowlist = new Array();
          $scope.workflowlist.push(workflows[i]);
        }
      }
    }
  }

  $scope.add = function(workflowitem)
  {

    //generate and id for the workflowitem
    workflowitem.id = Workflow.getNewWorkflowId();

    console.log("workflowitem.id" + workflowitem.id);

    //store the workflow in the db
    Workflow.store(workflowitem);

    if($scope.workflowlist)
    {
      $scope.workflowlist.push(this.workflowitem);
    }
    else
    {
      $scope.workflowlist = new Array();
      $scope.workflowlist.push(this.workflowitem);
    }
    //empty out the form
    this.workflowitem = "";
  }

  this.delete = function(index, id)
  {
      console.log('index:' + index);

      if(index && id)
      {
        Wrokflow.deleteByWorkflowId(id);
      }

      $scope.workflowlist.splice(index,1);
  }

  this.deleteItem = function(index)
  {
      $scope.workflows.splice(index);
  }

  //$scope.workflows = getWorkflows();

  $scope.workflowlist= getWorkflows();

  return this;
}]);
