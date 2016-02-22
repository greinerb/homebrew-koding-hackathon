app.factory('Workflow', ['$http', function WorkflowFactory($http){
  return {
    one: function(workflowId){
      console.log("get one workflow: " + workflowId);
      return $http({'method':'GET', 'url':'/myflows/workflow/' + workflowId});
    },
    oneTask: function(taskId){
      console.log("get one task: " + taskId);
      return $http({'method':'GET', 'url':'/myflows/task/' + taskId});
    },
    store: function(workflowToStore)
    {
      var id = workflowToStore._id;
      if(!workflowToStore._id)
      {
        id = workflowToStore.id;
      }
      delete workflowToStore._id;
      delete workflowToStore.id;

      console.log(workflowToStore);
      return $http({'method': 'PUT', 'url':'/myflows/workflow/' + id, data: workflowToStore});
    },
    newWorkflow: function(workflowToStore)
    {
      var id = workflowToStore._id;
      if(!workflowToStore._id)
      {
        id = workflowToStore.id;
      }
      delete workflowToStore._id;
      delete workflowToStore.id;

      console.log(workflowToStore);
      return $http({'method': 'PUT', 'url':'/myflows/workflow/', data: workflowToStore});
    },
    storeTask: function(taskToStore)
    {
      var id = taskToStore._id;
      if(!taskToStore._id)
      {
        id = taskToStore.id;
      }
      delete taskToStore._id;
      delete taskToStore.id;
      taskToStore.id = null;
      console.log(taskToStore);
      return $http({'method': 'PUT', 'url':'/myflows/task/' + id, data: taskToStore});
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
    },
    deleteByWorkflowId: function(id)
    {
      console.log('deleteByWorkflowId');
      return $http({'method':'DELETE', 'url':'/myflows/task/' + id});
    }
  };
}]);
