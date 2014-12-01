/**
 * Module Dependencies
 */

var extend = require('extend.js');
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
    validate(obj, schema._attrs, fn);
    return schema;
  }

  schema._attrs = {};

  // add the methods
  for (var k in Schema.prototype) {
    schema[k] = Schema.prototype[k];
  }

  // add the attributes
  for (var attr in attrs) {
    schema.attr(attr, attrs[attr]);
  }

  return schema;
}

/**
 * Add an attribute
 *
 * @param {String} attr
 * @param {Rube} rube (optional)
 */

Schema.prototype.attr = function(key, rube) {
  if (!key) {
    return this._attrs;
  } else if ('object' == typeof key) {
    this._attrs = extend(this._attrs, key)
  } else if (key.name == 'schema') {
    this._attrs = extend(this._attrs, key._attrs);
  } else if (rube) {
    this._attrs[key] = rube;
  } else {
    var rube = this._attrs[key] = Rube();
    rube.attr = this.attr.bind(this);
    return rube;
  }

  return this;
};

/**
 * Validate
 *
 * @param {Object} obj
 * @param {Object} schema
 * @return {Function} fn
 */

function validate(obj, schema, fn) {
  var batch = Batch().throws(false);
  var errors = {};
  var values = {};

  keys(obj).forEach(function(attr) {
    batch.push(function(next) {
      schema[attr](obj[attr], function(err, v) {
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
