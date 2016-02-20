app.controller("WorkflowController", ["$scope","Workflow", function($scope,Workflow){

  this.saveWorkflow = function(userToStore)
  {
    User.store(userToStore);
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

  this.getWorkflows = function(userId)
  {
    return [{name:"test"}];
  }

  this.add = function(data)
  {
    var post = data.nodes.length + 1;
    var newName = data.name + '-' + post;
    data.nodes.push({
      name: newName,
      nodes: []
    });
  }

  this.delete = function(data)
  {
      data.nodes = [];
  }

  $scope.workflows=[{
    name: "Workflow",
    nodes: []
  }];
  
  return this;
}]);
