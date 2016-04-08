// require a persistent database connection as soon as possible!!!!
require('../db/database');
var UserAccount = require('../models/UserAccount');

var bcrypt = require('bcrypt'); // BCrypt docs: https://github.com/ncb000gt/node.bcrypt.js
var control = control || {};    // 'control' data in an experiment
var db = db || {};              // mock database object
var chai = require('chai');     // http://chaijs.com/api/bdd/
var expect = chai.expect;       // http://chaijs.com/guide/styles/#expect
var should = require('chai').should(); //http://chaijs.com/guide/styles/#should
var assert = chai.assert;       // http://chaijs.com/guide/styles/#assert

describe('Creating a UserAccount Model', function() {
  it('can create an Object in a MongoDB Collection', function() {
    // model.create: 1st argument is the data we wanna save
    UserAccount.create({
      name: 'Captain Meowers',
      email: 'hey@hey.com',
      passwordHash: 'lol',
      birthDate: '12/12/12'
    }, function(error, account) { //returns either an orror or the object created
      shoud.not.exist(error); // there better not be an error
      should.exist(account); //we shoudl get back our mongoDB object
      should.exist(account.passwordHash) // without a password, lol
      should.exist(account.email) // without a email. lol
    });
  });
});

describe('BCrypt Password Hashing/Comparison', function() {
  // before each test ("it")
  beforeEach(function() {
    //runs before each test in this block
    //create some mock data to use
    control.salt = bcrypt.genSaltSync(10);
    control.mockUsersPassword = 's0/\/\P4$$w0rD';
    control.mockSuccessfulPasswordHashDbEntry; // undefined
    control.mockIncorrectPassword = 'giggles';
  });

  // after each test ("it")
  afterEach(function() {
    //runs after each test in this block
    //reset control
    testData = {};
  });

  // first test: generating a password hash
  it('should generate a hashed password', function() {
    UserAccount.create({
      name: 'Captain Meowers',
      email: 'hey@hey.com',
      passwordHash: bcrypt.hashSync(control.mockUsersPassword, control.salt),
      birthDate: '12/12/1122'
    }, function(error, account) { //returns either an orror or the object created
      shoud.not.exist(error); // there better not be an error
      should.exist(account); //we shoudl get back our mongoDB object
      should.exist(account.passwordHash) // without a password, lol
      should.exist(account.email) // without a email. lol

      expect(typeof(account.passwordHash)).to.equal('string');
      expect(account.passwordHash.length).to.equal(60);
    });
    // how to create a hash
    // hashSync(passwordString, saltNumber)
  }); // end it

  // second test: comparing our valid password
  it('should compare a valid password', function() {
    // Load hash from your password DB.
    var hashFromDb = db.usersPwdHash;
    // test result from db before continuing... gotta make sure that data is right
    expect(typeof(hashFromDb)).to.equal('string');
    expect(hashFromDb.length).to.equal(60);
    // use our mock user's password
    var comparison = bcrypt.compareSync(control.mockUsersPassword, hashFromDb); // true
    expect(comparison).to.equal(true);
  }); // end it

  it('should fail to compare an invalid password', function() {
    // Load hash from your password DB.
    var hashFromDb = db.usersPwdHash;
    // test result from db before continuing... gotta make sure that data is right
    expect(typeof(hashFromDb)).to.equal('string');
    expect(hashFromDb.length).to.equal(60);
    // use our mock user's password
    var comparison = bcrypt.compareSync(control.mockIncorrectPassword, hashFromDb); // true
    expect(comparison).to.equal(false);
  }); // end it
}); // end describe


// your turn...
// DESCRIBE the test suite
// tell IT what to test
// as many times as you need

// var experimentControl = {};
// describe('testing BCrypt on my own!', function() {
//   beforeEach(function() {
//     experimentControl.mockGrandmasPassword = 'little jimbo jones';
//   });
//   afterEach(function() {
//     experimentControl = {};
//   });
//   it('is a test', function() {
//
//   });
// });
