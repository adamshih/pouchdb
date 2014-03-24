'use strict';

var LevelPouch = require('./leveldb');
var levelalt = require('localstorage-down');
var utils = require('../utils');

function LevelPouchAlt(opts, callback) {
  var _opts = utils.extend({
    db: levelalt
  }, opts);

  LevelPouch.call(this, _opts, callback);
}

LevelPouchAlt.valid = function () {
  return LevelPouch.valid();
};

LevelPouchAlt.destroy = utils.toPromise(function (name, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  var backend = "localstorage-down"; // temporary
  if (backend === "localstorage-down" && !('destroy' in levelalt)) {
    levelalt.destroy = function (name, callback) {
      Object.keys(localStorage)
        .forEach(function (key) {
          if (key.substring(0, name.length) == name) {
            localStorage.removeItem(key);
          }
        });
      callback();
    }
  }

  var _opts = utils.extend({
    db: levelalt
  }, opts);

  return LevelPouch.destroy(name, _opts, callback);
});

module.exports = LevelPouchAlt;
