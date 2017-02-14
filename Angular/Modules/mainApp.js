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
            .state('about', {
                url: '/about',
                templateUrl: 'About.html',
                caseInsensitiveMatch: true,
                controller: 'MainController'
            });
    }
]);

//below factory code is for authentication, User Current Session Need to Get and get to go
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
