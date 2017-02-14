var mongoose = require('mongoose');

var Chars = new mongoose.Schema({
  name: String,
  bhp: Number,
  bstr: Number,
  bskl: Number,
  bspd: Number,
  bdef: Number,
  bres: Number,
  php: Number,
  pstr: Number,
  pskl: Number,
  pspd: Number,
  pdef: Number,
  pres: Number,
  type: String,
  image: String
});


const qu = mongoose.model('Chars', Chars);



module.exports = qu;
