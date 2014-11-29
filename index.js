/**
 * Module Dependencies
 */

var Attribute = require('./lib/attribute.js');
var Batch = require('batch');
var keys = Object.keys;

/**
 * Export `Schema`
 */

module.exports = Schema;

/**
 * Validate an object against a schema
 *
 * @return {Function}
 * @api public
 */

function Schema() {
  if (!(this instanceof Schema)) return new Schema();
  this.attrs = {};
}

/**
 * Add an attribute
 *
 * @param {String} key
 */

Schema.prototype.attr = function(key) {
  return new Attribute(key, this);
};

/**
 * Validate
 *
 * @param {Object} obj
 * @return {Function} fn
 */

Schema.prototype.validate = function(obj, fn) {
  var batch = Batch().throws(false);
  var self = this;
  var errors = {};
  var out = {};

  keys(obj).forEach(function(attr) {
    batch.push(function(next) {
      self.attrs[attr](obj[attr], function(err, v) {
        if (err) errors[attr] = err;
        else out[attr] = v;
        next();
      });
    });
  });

  batch.end(function(errs) {
    return keys(errors).length
      ? fn(errors)
      : fn(null, out);
  })
};
