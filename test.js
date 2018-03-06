'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// this makes the Should and expect syntax available throughout
// this module
const should = chai.should();
const expect = chai.expect;

const { User } = require('./models/users');
const { closeServer, runServer, app } = require('./app');
const { TEST_DATABASE_URL } = require('./config');
console.log(TEST_DATABASE_URL)

chai.use(chaiHttp);

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  data from one test does not stick
// around for next one
// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}


// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for Email Address, Password, first name, last name
// and then we insert that data into mongo
function seedUserData() {
  console.info('seeding regalia users data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
        EmailAddress: `${faker.name.firstName()}@asdf.com`,
        FirstName: faker.name.firstName(),
        LastName: faker.name.lastName(),
        RentPayment: '1222',
        password: 'asdf'
    });
  }
  // this will return a promise
  return User.insertMany(seedData);
}

describe('regalia posts API resource', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return seedUserData();
  });

  afterEach(function () {
    // tear down database so we ensure no state from this test
    // effects any coming after.
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function () {

    it('should return all existing users', function () {
      // strategy:
      //    1. get back all posts returned by by GET request to `/posts`
      //    2. prove res has right status, data type
      //    3. prove the number of posts we got back is equal to number
      //       in db.
      let res;
      return chai.request(app)
        .get('/users/for_tests')
        .then(_res => {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.allusers).to.have.length.of.at.least(1);
          return User.count();
        })
        .then(count => {
          expect(res.body.allusers).to.have.length(count);
        });
    });

  })
});


  describe('POST endpoint', function createNewUser() {

    it('should create a new user', function createNewUser() {
      // strategy:
      //    1. get back all posts returned by by GET request to `/posts`
      //    2. prove res has right status, data type
      //    3. prove the number of posts we got back is equal to number
      //       in db.
      let res;
      let newUser = {
        password: 'asdfjkl',
        FirstName: faker.name.firstName(),
        LastName: faker.name.lastName(),
        EmailAddress: `${faker.name.firstName()}@asdf.com`,
        RentPayment: 1400
      }
      return chai.request(app)
        .post('/users')
        .send(newUser)
        .then(_res => {
          res = _res;

          expect(res).to.have.status(201);
          expect(res.body).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id','FirstName','LastName','EmailAddress');
          expect(res.body.EmailAddress).should.equal(newUser.EmailAddress);
          // cause Mongo should have created 4`id on insertion
          expect(res.body.id).should.not.be.null;
          expect(res.body.RentPayment).to.equal(newUser.RentPayment);
          return User.findById(res.body.id);
        })
        .then(function (newUser) {
          console.log("NEW USER + ", newUser);
          expect(newUser.EmailAddress).to.equal(newUser.EmailAddress);
          expect(newUser.FirstName).to.equal(newUser.FirstName);
          expect(newUser.LastName).to.equal(newUser.LastName);
          expect(newUser.RentPayment).to.equal(newUser.RentPayment)
        })
        .done();
    });
  })
  describe('regalia API resource', function createNewUser() {

    before(function createNewUser() {
      return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function createNewUser() {
      return newUser();
    });

    afterEach(function createNewUser() {
      // tear down database so we ensure no state from this test
      // effects any coming after.
      return tearDownDb();
    });

    after(function createNewUser() {
      return closeServer();
    });
  });
  describe('DELETE endpoint', function deleteUser() {
     // strategy:
     //  1. get a user
     //  2. make a DELETE request for that user's email address
     //  3. assert that response has right status code 200
     //  4. prove that post with the id doesn't exist in db anymore
    it('should delete a user', function deleteUser() {
      let res;
      return User
        .findOne()
        .then(_res => {
          res = _res;
          return chai.request(app).delete(`/logged_in/${EmailAddress}`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.be(json);
        })
        .then(User => {
          expect(user).to.not.exist;
        })
  })
  describe('regalia API resource', function deleteUser() {

    before(function deleteUser() {
      return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function deleteUser() {
      return seedUserData();
    });

    afterEach(function deleteUser() {
      // tear down database so we ensure no state from this test
      // effects any coming after.
      return tearDownDb();
    });

    after(function deleteUser() {
      return closeServer();
    });
  });
    describe('PUT endpoint', function updateUser() {
      it('should return user data with right fields updated', function updateUser() {
      // Strategy: It should update a users' account info
      //
       let res;
       let User = User;
       let updateUser ={
              EmailAddress: 'test@regalia.com',
              FirstName: 'Tom',
              LastName: 'Sawyer',
              RentPayment: '1500'
            };

       return chai.request(app)
        .findOne()
         .put('/logged_in/for_tests')
         .send(updateUser)
         .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.id).to.equal(updateUser.id);
          expect(res.body.EmailAddress).to.equal(updateUser.EmailAddress)
          expect(res.body.RentPayment).to.equal(updateUser.RentPayment)
          expect(res.body.FirstName).to.equal(updateUser.FirstName)
          expect(res.body.LastName).to.equal(updateUser.LastName)
         })
      })
    });
    describe('regalia API resource', function updateUser() {

      before(function updateUser() {
        return runServer(TEST_DATABASE_URL);
      });
  
      beforeEach(function updateUser() {
        return updateUser();
      });
  
      afterEach(function updateUser() {
        // tear down database so we ensure no state from this test
        // effects any coming after.
        return tearDownDb();
      });
  
      after(function updateUser() {
        return closeServer();
      });
    });
  });