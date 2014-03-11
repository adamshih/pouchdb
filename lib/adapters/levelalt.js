'use strict';

var LevelPouch = require('./leveldb');
var levelalt = require('level-js');
var utils = require('../utils');

var LevelPouchAlt = function(opts, callback) {
  var _opts = utils.extend({
    db: levelalt
  }, opts);

  return new LevelPouch(_opts, callback);
};

LevelPouchAlt.valid = function () {
  return LevelPouch.valid();
};

LevelPouchAlt.destroy = utils.toPromise(function (name, opts, callback) {
  var _opts = utils.extend({
    db: levelalt
  }, opts);

  return LevelPouch.destroy(name, _opts, callback);
});

module.exports = LevelPouchAlt;