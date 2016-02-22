app.factory('Workflow', ['$http', function WorkflowFactory($http){
  return {
    one: function(workflowId){
      console.log("get one workflow: " + workflowId);
      return $http({'method':'GET', 'url':'/myflows/workflow/' + workflowId});
    },
    store: function(workflowToStore)
    {
      if(workflowToStore._id && !workflowToStore.id)
      {
        workflowToStore.id = workflowToStore._id;
      }
      console.log(workflowToStore);
      return $http({'method': 'PUT', 'url':'/myflows/workflow/' + workflowToStore.id, data: workflowToStore});
    },
    storeTask: function(taskToStore)
    {
      if(taskToStore.id && !taskToStore._id)
      {
        taskToStore._id = taskToStore.id;
      }
      taskToStore.id = null;
      console.log(taskToStore);
      return $http({'method': 'PUT', 'url':'/myflows/task/' + taskToStore._id, data: taskToStore});
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
