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

main.controller('MainController', ($rootScope, $scope, mainFactory) => {
    $scope.attacker = {};
    $scope.defender = {};
    $scope.characters = [];

    $scope.getCharacters = () => {
        mainFactory.getAll().then((data) => {
          console.log(data);
          $scope.characters = data;
        });
    };

    $scope.getCharacters();

});

main.factory('mainFactory', ($resource, $rootScope, $http) => {

  // Your code here
  var getAll = function () {
    console.log('IM BEING CALLED');
    return $http({
      method: 'GET',
      url: '/retrieve/chars'
    })
    .then( (resp) => {
      console.log('IM RETURNING:', resp.data);
      return resp.data
    });
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
