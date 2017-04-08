/* global angular */ 
angular.module('App', ['ui.router','ngRoute','ngResource'])
.run(($http, $rootScope) => {}).config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
              url: '/',
              templateUrl: 'Index.html',
              caseInsensitiveMatch: true,
              controller: 'MainController'
            })
            .state('arena', {
              url: '/arena',
              templateUrl: 'Arena.html'
            })
            .state('arena.attacker', {
              url: '/attacker',
              templateUrl: 'Attacker.html'
            })
            .state('arena.attacker.defender', {
              url: '/defender',
              templateUrl: 'Defender.html'
            })
            .state('arena.attacker.defender.stats', {
              url: '/stats',
              templateUrl: 'Stats.html'
            });
    }
]);
