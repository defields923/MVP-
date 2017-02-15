//auth controller
var Q = require('q');

var Char = require('./CharModel.js');

// Promisify a few mongoose methods with the `q` promise library
const findLink = Q.nbind(Char.findOne, Char);
const findAllLinks = Q.nbind(Char.find, Char);

module.exports = {

  getChars: function (req, res, next) {
    findAllLinks({})
      .then((chars) => {
        res.json(chars);
      })
      .fail((error) => {
        next(error);
      });
  }
};
