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

    if(workflows && workflows.nodes)
    {
      for(i = 0; i < workflows.nodes.length; i++)
      {
        var workflow = Workflow.one(workflows.nodes[i].workflowId);
        workflows.nodes.push(workflow);
      }
    }

    return [{
            name: "Workflow",
            nodes: []
            }];
  }

  this.add = function(data)
  {

    Workflow.store(data);

    var newId = new Date().getUTCMilliseconds();
    var post = data.nodes.length + 1;
    var newName = data.name + '-' + post;
    data.nodes.push({
      name: newName,
      id: newId,
      nodes: []
    });
  }

  this.delete = function(data)
  {
      if(data && data.id)
      {
        Wrokflow.deleteByWorkflowId(data.id);
      }

      data.nodes = [];
  }

  this.deleteItem = function(index)
  {
      $scope.workflows.splice(index);
  }

  $scope.workflows = getWorkflows();

  return this;
}]);
