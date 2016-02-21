app.factory('Workflow', ['$http', function WorkflowFactory($http){
  return {
    one: function(workflowId){
      console.log("get one workflow: " + workflowId);
      return $http({'method':'GET', 'url':'/myflows/workflow/' + workflowId});
    },
    store: function(workflowToStore)
    {
      console.log(workflowToStore);
      return $http({'method': 'PUT', 'url':'/myflows/workflow/' + workflowToStore.id, data: workflowToStore});
    },
    byUser: function(username)
    {
      console.log('get workflows for user ' + username);
      return $http({'method':'GET', 'url':'/myflows/workflow/user/' + username});
    },
    getNewWorkflowId: function()
    {
      console.log('getNewWorkflowId');
      return $http({'method':'GET', 'url':'/myflows/workflow/generateId'});
    },
    getNewTaskId: function()
    {
      console.log('getNewTaskId');
      return $http({'method':'GET', 'url':'/myflows/task/generateId'});
    }
  };
}]);
