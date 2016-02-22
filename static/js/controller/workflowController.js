app.controller("WorkflowController", ["$scope","Workflow", "User", "$routeParams", function($scope, Workflow, User, $routeParams){

  $scope.primaryFlow = {};
  $scope.children = [];

  var getWorkflows = function(workflowId)
  {
    //get the workflows for a user
    Workflow.one(workflowId).success(function(data){
      console.log('primary');
      console.log(data);
      $scope.primaryFlow = data;

      if($scope.primaryFlow.children)
      {
        forEach(child in $scope.primaryFlow.children)
        {
          Workflow.one(child).success(function(data){
            console.log('child');
            console.log(data);
            $scope.children.push(data);
          })
        }
      }
      else {
        $scope.primaryFlow.children = [];
      }
    });
  }

  $scope.add = function(workflowitem)
  {
    //generate and id for the workflowitem
    Workflow.getNewWorkflowId().success(function(data){
      console.log('generated id:' + data);
      var workflow = {'id': data};
      $scope.children.push(workflow);
      $scope.primaryFlow.children.push(data);
    });
  }

  this.delete = function(index)
  {
      console.log('index:' + index);
      Workflow.deleteByWorkflowId(id).success(function(data){
        $scope.children.splice(index, 1);
        $scope.primaryFlow.children.splice(index, 1);
      });
  }

  this.index = -2;
  $scope.isEditable = function(idx)
  {
    return this.index == idx;
  };

  $scope.makeEditable = function(idx)
  {
    console.log('making eidtable ' + idx);
    if(this.index == -1)
    {
      Workflow.store($scope.primaryFlow)
        .success(function(data){
          console.log('saved idx ' + idx);
          this.index = idx;
        });
    }
    else if(this.index >=0 && this.index < $scope.children.length)
    {
      Workflow.storeTask($scope.children[this.index])
        .success(function(data){
          console.log('saved idx ' + ithis.index);
          this.index = idx;
          console.log('curr index=' + this.index);
          console.log('iseditable=' + $scope.isEditable(this.index));
        });
    }
    else {
      this.index = idx;
    }
  }

  $scope.save = function(idx)
  {
    if(idx ==-1)
    {
      Workflow.store($scope.primaryFlow)
        .success(function(data){
          console.log('saved idx ' + idx);
          this.index = -2;
          console.log('curr index=' + this.index);
          console.log('iseditable=' + $scope.isEditable(this.index));
        });
    }
    else if(idx >=0 && idx < $scope.children.length)
    {
      Workflow.storeTask($scope.children[idx])
        .success(function(data){
          console.log('saved idx ' + idx);
          this.index = -2;
          console.log('curr index=' + this.index);
          console.log('iseditable=' + $scope.isEditable(this.index));
        });
    }
    else {
      this.index = -2;
    }
  }

  console.log($routeParams.id);
  getWorkflows($routeParams.id);
}]);
