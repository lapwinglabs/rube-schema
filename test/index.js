/**
 * Module Dependencies
 */

var assert = require('assert');
var Schema = require('../');
var rube = require('rube');

describe('Schema', function() {

  it('should validate schema', function(done) {
    var schema = Schema();

    schema.attr('name').type(String)
          .attr('email').type(String)
          .attr('age').cast(Number).type(Number);

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

  it('should support composing objects', function(done) {
    var name = Schema().attr('name', rube().type(String));
    var email = Schema().attr('email', rube().assert(/@/).type(String));
    var age = Schema().attr('age', rube().cast(Number).type(Number));

    var schema = Schema()
      .attr(name)
      .attr(email)
      .attr(age)

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
    });

  });

  it('should support passing objects through `schema.attr`', function(done) {
    var schema = Schema()
      .attr({
        name: rube().type(String),
        email: rube().assert(/@/).type(String),
        age: rube().cast(Number).type(Number)
      })

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
    });
  })

  it('should remove properties that arent part of the schema', function(done) {
    var schema = Schema();

    schema.attr('name').type(String)
          .attr('email').type(String)
          .attr('age').cast(Number).type(Number);

    schema({
      name: 'matt',
      email: 'matt@lapwinglabs.com',
      age: '25',
      pets: []
    }, function(err, v) {
      assert(!err);
      assert('matt' == v.name);
      assert('matt@lapwinglabs.com' == v.email);
      assert(25 === v.age);
      assert(v.pets == undefined);
      done();
    })

  })
})
