var app = angular.module("myFlows", ['ngRoute', 'door3.css', 'ui.bootstrap'])
  .config(['$routeProvider', function($routeProvider){

    $routeProvider
      .when('/about', {
        templateUrl: 'templates/about.html',
        controller: function(){
          console.log('about');
        }
      })
      .when('/user', {
        templateUrl: 'templates/user-modify.html',
        css: 'css/app.css',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        scope: {
          user: '='
        }
      })
      .when('/view/:id', {
        templateUrl: 'templates/workflow-display.html',
        controller: 'WorkflowController',
        controllerAs: 'workflowCtrl',
        scope: {
          primaryFlow: '=',
          children: '='
        }
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
      .when('/login', {
        templateUrl: 'templates/login-modal.html',
        controller: 'NavController',
        controllerAs: 'navCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });

  }]);
