//auth controller
var Q = require('q');

var Char = require('../Models/linkModel.js');

// Promisify a few mongoose methods with the `q` promise library
const findLink = Q.nbind(Link.findOne, Char);
const findAllLinks = Q.nbind(Link.find, Char);

module.exports = {

  getChars: function (req, res, next) {
    findAllLinks({})
      .then((chars) => {
        res.json(chars);
      })
      .fail((error) => {
        next(error);
      });
  },

  getChar: function (req, res, next) {
    var name = req.body.name;

    findLink({name: name})
      .then((match) => {
        if (match) {
          res.send(match);
        } else {
          res.end();
        }
      })
      .fail((error) => {
        next(error);
      });
  }
};
