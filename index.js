/**
 * Module Dependencies
 */

var Attribute = require('./lib/attribute.js');
var Batch = require('batch');
var Rube = require('rube');
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

function Schema(attrs) {
  if (!(this instanceof Schema)) return new Schema(attrs);
  attrs = attrs || {};

  function schema(obj, fn) {
    schema.validate(obj, fn);
    return schema;
  }

  schema._attrs = {};

  // add the methods
  for (var k in Schema.prototype) {
    schema[k] = Schema.prototype[k];
  }

  // add the attributes
  for (var attr in attrs) {
    schema.key(attr, attrs[attr]);
  }

  return schema;
}

/**
 * Add an attribute
 *
 * @param {String} key
 */

Schema.prototype.key = function(key, rube) {
  if (rube) {
    this._attrs[key] = rube;
    return this;
  }

  return this._attrs[key] = Rube();
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
  var values = {};

  keys(obj).forEach(function(attr) {
    batch.push(function(next) {
      self._attrs[attr](obj[attr], function(err, v) {
        if (err) {
          errors[attr] = err;
          return next(err);
        } else {
          values[attr] = v;
          return next();
        }
      });
    });
  });

  batch.end(function(errs) {
    return keys(errors).length
      ? fn(errors)
      : fn(null, values);
  })
};
