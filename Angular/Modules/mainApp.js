//Angular Starter App
/* global angular */
const main = angular.module("main", ['ui.router','ngRoute','ngResource'])
.run(($http, $rootScope) => {
    //defining global veriables
    $rootScope.roles = [];


});

//Routing Configuration (define routes)
main.config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $rootScope) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'Index.html',
                caseInsensitiveMatch: true,
                controller: 'MainController'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'Contact.html',
                caseInsensitiveMatch: true,
                controller: 'MainController'
            })
            .state('arena', {
                url: '/arena',
                templateUrl: 'Arena.html',
                caseInsensitiveMatch: true,
                controller: 'MainController'
            })
            .state('arena.stage', {
              url: '/stage',
              views: {
                '': { templateUrl: 'stage.html' },
                'attacker': {
                  url: '/attacker',
                  templateUrl: 'Attacker.html',
                  controller: 'MainController'
                },
                'defender': {
                  url: '/defender',
                  templateUrl: 'Defender.html',
                  controller: 'MainController'
                },
                'stats': {
                  url: '/stats',
                  templateUrl: 'Stats.html',
                  controller: 'MainController'
                }
              }
            });
            // .state('arena.attacker', {
            //
            // })
            // .state('arena.defender', {
            //
            // })
            // .state('arena.stats', {
            //
            // })
    }
]);


main.factory('mainFactory', ($resource, $rootScope, $http) => {

  // Your code here
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then( (resp) => resp.data );
  };

  var getOne = function(link) {
    return $http({
      method: 'GET',
      url: '/api/links',
      data: link
    })
    .then( (resp) => resp );
  };

  return{
    getAll: getAll,
    getOne: getOne
  };
});
