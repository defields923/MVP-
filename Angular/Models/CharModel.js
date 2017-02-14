var mongoose = require('mongoose');

var Characters = new mongoose.Schema({
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

module.exports = mongoose.model('Character', Characters);
