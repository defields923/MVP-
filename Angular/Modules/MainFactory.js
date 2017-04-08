angular.module('App').factory('MainFactory', ($resource, $rootScope, $http) => {

  const lvlUp = (obj, num) => {
    const objKeys = Object.keys(obj);
    for (let i = 0; i < num; i += 1) {
      objKeys.forEach(k => {
        obj[k] = obj[k] < Math.random() * 100 ? ++obj[k] : obj[k];
      });
    }
    return obj;
  };

  const calcDam = (attacker, defender, battleResults) => {
    let attHP = attacker.bhp;
    const attSpd = attacker.bspd;
    let attStr = attacker.bstr;
    const attDef = attacker.bdef;
    let defHP = defender.bhp;
    let defStr = defender.bstr;
    const defSpd = defender.bspd;
    const defDef = defender.bdef;

    const tAdv = typeWheel(attacker.type, defender.type);
    if (tAdv === 'a') {
        attStr += Math.floor(attStr * 0.5);
    } else if (tAdv === 'd') {
        defStr += Math.floor(defStr * 0.5);
    }

    let offenseDamage = attStr - defDef;
    if (offenseDamage < 0) {
      offenseDamage = 0;
    }
    defHP -= offenseDamage;
    if (defHP <= 0) {
      return setHP(battleResults, true, attHP);
    }
    let defenseDamage = defStr - attDef;
    if (defenseDamage < 0) {
      defenseDamage = 0;
    }
    attHP -= defenseDamage;
    if (attHP <= 0) {
      return setHP(battleResults, false, defHP);
    }

    if (attSpd - defSpd >= 5) {
      defHP -= offenseDamage;
      if (defHP <= 0) {
        return setHP(battleResults, true, attHP);
      }
    } else if (defSpd - attSpd >= 5) {
      attHP -= defenseDamage;
      if (attHP <= 0) {
        return setHP(battleResults, false, defHP);
      }
    }
    battleResults.attHP = attHP;
    battleResults.defHP = defHP;
  };

  const setHP = (batRes, attOrDef, remainHP) => {
    if (attOrDef) {
      batRes.defHP = 0;
      batRes.attHP = remainHP;
    } else {
      batRes.attHP = 0;
      batRes.defHP = remainHP;
    }
  }

  const typeWheel = (attType, defType) => {
    if (attType === 'sword' && defType === 'axe' ||
      attType === 'axe' && defType === 'lance' ||
      attType === 'lance' && defType === 'sword') {
        return 'a';
    }
    if (defType === 'sword' && attType === 'axe' ||
      defType === 'axe' && attType === 'lance' ||
      defType === 'lance' && attType === 'sword') {
        return 'd';
    }
  };

  const getAll = () =>
    $http({
      method: 'GET',
      url: '/retrieve/chars',
    })
    .then(resp => resp.data);

  const getOne = (link) =>
    $http({
      method: 'GET',
      url: '/api/links',
      data: link,
    })
    .then(resp => resp);

  return{
    getAll,
    getOne,
    lvlUp,
    typeWheel,
    calcDam,
  };
});
