app.factory('aboutFactory', function(){
  var teamMembers =   [{
                            'name': 'Devin Lewis',
                            'origin': 'West Branch, IA',
                            'interests': 'Tech, Fishing, breaking things, fixing things and anything outdoors',
                            'emailAddress': 'devin.lewis@ihawkcs.com',
                            'twitterHandle': '',
                            'mugPath': 'content/images/DEVIN.jpg',
                            'status': 'Active'
                        },
                        {
                            'name': 'Brent Greiner',
                            'origin': 'IA',
                            'interests': '',
                            'emailAddress': 'brentgreiner@gmail.com',
                            'twitterHandle': '',
                            'mugPath': 'content/images/BRENT.jpg',
                            'status': 'Active'
                        },
                        {
                            'name': 'Vernon Foust',
                            'origin': 'IA',
                            'interests': '',
                            'emailAddress': 'vernonfoustwollenberg@gmail.com',
                            'twitterHandle': '',
                            'mugPath': 'content/images/VERNON.jpg',
                            'status': 'Active'
                        },
                        {
                            'name': 'Joel Krueger',
                            'origin': 'IA',
                            'interests': '',
                            'emailAddress': 'joel.kruege@gmail.com',
                            'twitterHandle': '',
                            'mugPath': 'content/images/JOEL.jpg',
                            'status': 'Active'
                        },
                        {
                            'name': 'Eleanor Kauffman',
                            'origin': 'IA',
                            'interests': '',
                            'emailAddress': 'eleanorkauffman@gmail.com',
                            'twitterHandle': '',
                            'mugPath': 'content/images/ELEANOR.jpg',
                            'status': 'Active'
                        },
                        {
                            'name': 'Rajni Vijh',
                            'origin': 'IA',
                            'interests': '',
                            'emailAddress': 'rajni.vijh@act.org',
                            'twitterHandle': '',
                            'mugPath': 'content/images/RAJNI.jpg',
                            'status': 'Active'
                        },
                        {
                            'name': 'Justin Jones',
                            'origin': 'IA',
                            'interests': '',
                            'emailAddress': 'justin.e.jones.dad@gmail.com',
                            'twitterHandle': '',
                            'mugPath': 'content/images/JUSTIN.jpg',
                            'status': 'Active'
                        },
                        {
                            'name': 'Todd Thomas',
                            'origin': 'IA',
                            'interests': '',
                            'emailAddress': 'todd.l.thomas@gmail.com',
                            'twitterHandle': '',
                            'mugPath': 'content/images/TODD.jpg',
                            'status': 'Active'
                        }];
    var factory = {};
    factory.getTeamMembers = function() {
      return teamMembers;
    };

    return factory;
});

app.controller("AboutController", function($scope, aboutFactory) {
  $scope.teamMembers = [];

  $scope.teamMembers = aboutFactory.getTeamMembers();
});
