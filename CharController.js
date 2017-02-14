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
        console.log(chars, 'HEY');
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
