app.factory('Workflow', ['$http', function WorkflowFactory($http){
  return {
    one: function(workflowId){
      console.log("get one workflow: " + workflowId);
    },
    store: function(workflowToStore)
    {
      console.log(workflowToStore);
    },
    byUser: function(userId)
    {
      console.log('get workflows for user ' + userId);
    }
  };
}]);
