angular.module('App').controller('MainController', ($rootScope, $scope, MainFactory) => {
    $scope.attacker = {};
    $scope.defender = {};
    $scope.characters;
    $scope.levels = Array.from(Array(40), (e, i) => i += 1);

    MainFactory.getAll().then((data) => {
      $scope.characters = data;
    });

    $scope.battleResults = {};

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
      $scope.attacker = MainFactory.lvlUp(temp, num);
      $scope.attacker.lvl = num;

    };
    $scope.levelUpDefender = (num) => {
      const char = $scope.defender;
      const temp = JSON.parse(JSON.stringify(char));
      $scope.defender = MainFactory.lvlUp(temp, num);
      $scope.defender.lvl = num;
    };

    $scope.calculateDamage = () => MainFactory.calcDam($scope.attacker, $scope.defender, $scope.battleResults);
});
