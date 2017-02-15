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
    $scope.levels = [];


    $scope.getLevels = () => {
      let i = 1;
      while (i <= 40) {
        $scope.levels.push(i);
        i += 1;
      }
    };
    $scope.getLevels()

    $scope.battleResults = {};

    $scope.getCharacters = () => {
      mainFactory.getAll().then((data) => {
        $scope.characters = data;
      });
    };
    $scope.getCharacters();


    $scope.changeAttacker = (char) => {
      $scope.attacker = char;
      $scope.attacker.lvl = 1;
    };
    $scope.changeDefender = (char) => {
      $scope.defender = char;
      $scope.defender.lvl = 1;
    };

    $scope.levelUpAttacker = (num) => {
      const char = $scope.attacker;
      const temp = JSON.parse(JSON.stringify(char));
      $scope.attacker = $scope.levelUp(temp, num);
      $scope.attacker.lvl = num;

    };
    $scope.levelUpDefender = (num) => {
      const char = $scope.defender;
      const temp = JSON.parse(JSON.stringify(char));
      $scope.defender = $scope.levelUp(temp, num);
      $scope.defender.lvl = num;
    };
    $scope.levelUp = (obj, num) => {
      for (let i = 0; i < num; i++) {
        if (obj.php < Math.random() * 100) {
          obj.bhp += 1;
         }
         if (obj.pstr < Math.random() * 100) {
          obj.bstr += 1;
         }
         if (obj.pskl < Math.random() * 100) {
          obj.bskl += 1;
         }
         if (obj.pspd < Math.random() * 100) {
          obj.bspd += 1;
         }
         if (obj.pdef < Math.random() * 100) {
          obj.bdef += 1;
         }
         if (obj.pres < Math.random() * 100) {
          obj.bres += 1;
         }
      }
      return obj;
    };

    $scope.calculateDamage = () => {
      let attHP = $scope.attacker.bhp;
      const attSpd = $scope.attacker.bspd;
      let attStr = $scope.attacker.bstr;
      const attDef = $scope.attacker.bdef;
      let defHP = $scope.defender.bhp;
      let defStr = $scope.defender.bstr;
      const defSpd = $scope.defender.bspd;
      const defDef = $scope.defender.bdef;

      const tAdv = $scope.typeWheel();
      if (tAdv && tAdv === 'a') {
          const extra = Math.floor(attStr * 0.5);
          attStr += extra;
      } else if (tAdv && tAdv === 'd') {
          const extra = Math.floor(defStr * 0.5)
          defStr += extra;
      }

      let offenseDamage = attStr - defDef;
      if (offenseDamage < 0) {
        offenseDamage = 0;
      }
      defHP -= offenseDamage;
      if (defHP <= 0) {
        $scope.battleResults.defHP = 0;
        $scope.battleResults.attHP = attHP;
        return;
      }
      let defenseDamage = defStr - attDef;
      if (defenseDamage < 0) {
        defenseDamage = 0;
      }
      attHP -= defenseDamage;
      if (attHP <= 0) {
        $scope.battleResults.attHP = 0;
        $scope.battleResults.defHP = defHP
        return;
      }
      if (attSpd - defSpd >= 5) {
        defHP -= offenseDamage;
        if (defHP <= 0) {
          $scope.battleResults.defHP = 0;
          $scope.battleResults.attHP = attHP;
          return;
        }
      } else if (defSpd - attSpd >= 5) {
        attHP -= defenseDamage;
        if (attHP <= 0) {
          $scope.battleResults.attHP = 0;
          $scope.battleResults.defHP = defHP;
          return;
        }
      }
      $scope.battleResults.attHP = attHP;
      $scope.battleResults.defHP = defHP;
    };

    $scope.typeWheel = () => {
      const attType = $scope.attacker.type;
      const defType = $scope.defender.type;

      if (attType === 'sword' && defType === 'axe') {
          return 'a';
      }
      if (attType === 'axe' && defType === 'lance') {
          return 'a';
      }
      if (attType === 'lance' && defType === 'sword') {
          return 'a';
      }
      if (defType === 'sword' && attType === 'axe') {
          return 'd';
      }
      if (defType === 'axe' && attType === 'lance') {
          return 'd';
      }
      if (defType === 'lance' && attType === 'sword') {
          return 'd';
      }
    };

});

main.factory('mainFactory', ($resource, $rootScope, $http) => {

  // Your code here
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/retrieve/chars'
    })
    .then( (resp) => {
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
