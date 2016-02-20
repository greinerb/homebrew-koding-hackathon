var app = angular.module("myFlows", ['ngRoute', 'door3.css'])
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
        controllerAs: 'userCtrl'
      })
      .when('/view/:id', {
        templateUrl: 'templates/workflow-display.html',
        controller: function(){
          console.log('display');
        }
      })
      .when('/list', {
        templateUrl: 'templates/workflow-list.html',
        controller: function(){
          console.log('list');
        }
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
