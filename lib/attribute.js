/**
 * Module dependencies
 */

var Rube = require('rube');

/**
 * Export `Attribute`
 */

module.exports = Attribute;

/**
 * Initialize `Attribute`
 */

function Attribute(key, schema) {
  schema.attrs[key] = this.rube = Rube();
  this.schema = schema;
  this.key = key;
}

/**
 * Delegate to `rube`
 */

[ 'default', 'replace', 'require', 'type', 'cast' ]
  .forEach(function(m) {
    Attribute.prototype[m] = function() {
      this.rube[m].apply(this.rube, arguments);
      return this;
    };
  });

/**
 * Delegate to `schema`
 */

[ 'validate', 'attr' ]
  .forEach(function(m) {
    Attribute.prototype[m] = function() {
      return this.schema[m].apply(this.schema, arguments);
    };
  });
