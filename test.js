'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the Should syntax available throughout
// this module
const should = chai.should();

const { Users } = require('./models/users');
const { closeServer, runServer, app } = require('./app');
const { TEST_DATABASE_URL } = require('./config');

chai.use(chaiHttp);

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
      Users: {
        EmailAddress: faker.internet.EmailAddress(),
        FirstName: faker.name.FirstName(),
        LastName: faker.name.LastName(),
        RentPayment: faker.number.RentPayment(),
        password: faker.text.password()
      }
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
          expect(res).to.should.have.status(200);
          // otherwise our db seeding didn't work
          expect(res.body.should.allusers).to.have.length.of.at.least(1);
          return Users.count();
        })
        .then(count => {
          expect(res.body.allusers).to.have.length(count);
        });
    });

    it('should return posts with right fields', function () {
      // Strategy: Get back all posts, and ensure they have expected keys

      let resPost;
      return chai.request(app)
        .get('/users')
        .then(function (res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function (post) {
            post.should.be.a('object');
            post.should.include.keys('id', 'EmailAddress', 'FirstName', 'LastName', 'password', 'RentPayment');
          });
          // just check one of the posts that its values match with those in db
          // and we'll assume it's true for rest
          resPost = res.body[0];
          return Users.findById(resPost.id);
        })
        .then(post => {
          resPost.EmailAddress.should.equal(post.EmailAddress);
          resPost.FirstName.should.equal(post.FirstName);
          resPost.LastName.should.equal(post.LastName);
          resPost.RentPayment.should.equal(post.RentPayment);
        });
    });
  });

  describe('POST endpoint', function () {
    // strategy: make a POST request with data,
    // then prove that the post we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should create a new user account', function () {

      const newUser = {
        EmailAddress: faker.text.EmailAddress(),
        password: faker.text.password(),
        FirstName: faker.name.FirstName(),
        LastName: faker.name.LastName(),
        RentPayment: faker.number.RentPayment()
      };

      return chai.request(app)
        .post('javascripts/homescreen.js')
        .send(newUser)
        .then(function (res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'EmailAddress', 'FirstName', 'LastName', 'password', 'RentPayment');
          res.body.EmailAddress.should.equal(newUser.EmailAddress);
          // cause Mongo should have created id on insertion
          res.body.id.should.not.be.null;
          res.body.FirstName.should.equal(
            `${newUser.FirstName} ${newPost.LastName}`);
          res.body.RentPayment.should.equal(newUser.RentPayment);
          return User.findById(res.body.id);
        })
        .then(function (post) {
          // to test with New User & CHANGE POST PARAMETER??
          post.EmailAddress.should.equal(newUser.EmailAddress);
          post.RentPayment.should.equal(newUser.RentPayment);
          post.FirstName.should.equal(newUser.FirstName);
          post.LastName.should.equal(newUser.LastName);
        });
    });
  });

  describe('PUT endpoint', function () {

    // strategy:
    //  1. Get an existing post from db
    //  2. Make a PUT request to update that post
    //  4. Prove post in db is correctly updated
    it('should update fields you send over', function () {
      const updateData = {
        EmailAddress: 'TomSawyer@regalia.com',
        FirstName: 'Tom',
        LastName: 'Sawyer',
        RentPayment: '1400'
      };

      return User
        .findOne()
        .then(user => {
          updateData.id = user.id;

          return chai.request(app)
            .put(`/homescreen/${user.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(204);
          return User.findById(updateData.id);
        })
        //CHANGE POST PARAMETER??
        .then(post => {
          post.EmailAddress.should.equal(updateData.EmailAddress);
          post.RentPayment.should.equal(updateData.RentPayment);
          post.FirstName.should.equal(updateData.FirstName);
          post.LastName.should.equal(updateData.LastName);
        });
    });
  });

  describe('DELETE endpoint', function () {
    // strategy:
    //  1. get a post
    //  2. make a DELETE request for that post's id
    //  3. assert that response has right status code
    //  4. prove that post with the id doesn't exist in db anymore
    it('should delete a post by id', function () {

      let post;

      return BlogPost
        .findOne()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/posts/${post.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return BlogPost.findById(post.id);
        })
        .then(_post => {
          // when a variable's value is null, chaining `should`
          // doesn't work. so `_post.should.be.null` would raise
          // an error. `should.be.null(_post)` is how we can
          // make assertions about a null value.
          should.not.exist(_post);
        });
    });
  });
});