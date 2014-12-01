/**
 * Module Dependencies
 */

var assert = require('assert');
var Schema = require('../');
var rube = require('rube');

describe('Schema', function() {

  it('should validate schema', function(done) {
    var schema = Schema();

    schema.key('name').type(String);
    schema.key('email').type(String);
    schema.key('age').cast(Number).type(Number);

    schema({
      name: 'matt',
      email: 'matt@lapwinglabs.com',
      age: '25'
    }, function(err, v) {
      assert(!err);
      assert('matt' == v.name);
      assert('matt@lapwinglabs.com' == v.email);
      assert(25 === v.age);
      done();
    })
  });

  it('should work by passing in an object', function(done) {
    var schema = Schema({
      name: rube().type(String),
      email: rube().assert(/@/).type(String),
      age: rube().cast(Number).type(Number)
    });

    schema({
      name: 'matt',
      email: 'matt@lapwinglabs.com',
      age: '25'
    }, function(err, v) {
      assert(!err);
      assert('matt' == v.name);
      assert('matt@lapwinglabs.com' == v.email);
      assert(25 === v.age);
      done();
    })
  });
})
