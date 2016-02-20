var app = angular.module("myFlows", ['ngRoute', 'door3.css', 'ui.bootstrap'])
  .config(['$routeProvider', function($routeProvider){

    $routeProvider
      .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutController'
      })
      .when('/user', {
        templateUrl: 'templates/user-modify.html',
        css: 'css/app.css',
        controller: 'UserController',
        controllerAs: 'userCtrl'
      })
      .when('/view/:id', {
        templateUrl: 'templates/workflow-display.html',
        css: 'css/app.css',
        controller: 'WorkflowController',
        controllerAs: 'workflowCtrl'
      })
      .when('/list', {
        templateUrl: 'templates/workflow-list.html',
        controller: 'WorkflowListController',
        controllerAs: 'listCtrl'
      })
      .when('/home', {
        templateUrl: 'templates/default.html',
        controller: function(){
          console.log('default');
        }
      })
      .otherwise({
        redirectTo: '/home'
      });

  }]);
