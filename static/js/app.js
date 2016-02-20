var app = angular.module("myFlows", ['ngRoute'])
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
        controller: function(){
          console.log('user');
        }
      })
      .when('/view', {
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
