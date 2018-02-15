var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const { User } = require('../models/users');



<<<<<<< HEAD
/* GET users listing. */
router.get('/', function(req, res, next) {
  //this is going to the userpage endpoint for a specific individual, with regalia#, and find the data, and return
  


  res.send('respond with a resource');
=======
const { User } = require('../models/users');

router.get('/', function(req, res) {
  User
	.find({})
	.then(users => {
		let userArray = users.map(function(user){return user.serialize()})
		let obj = {users: userArray}
		res.status(201).send(userArray)
	})
	.catch(err => {
	  console.error("err");
	  res.status(500).json({message: 'Internal server error'});
	});
>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee
});
// router.post('/', function(req, res) {
//   console.log('users post', req.body)
//   User.create({
//     EmailAddress:req.body.EmailAddress,
//     UserName:req.body.UserName,
//     password:req.body.password,
//     FirstName:req.body.FirstName,
//     LastName:req.body.LastName,
//     RentPayment:req.body.RentPayment
      
//   }).then(user => { 
//     console.log("registered");
//     res.status(201).send(user.serialize());})
//   .catch(err => {
//      console.error("err"); 
//      res.status(500).json({message: 'Internal server error'}); });
// });
router.post('/', jsonParser, (req, res) => {
  const requiredFields = [ 'password', 'FirstName', 'LastName', 'EmailAddress' ];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    console.log('missing entity field')
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
//check to see if datatypes are correct
  const stringFields = [ 'password', 'FirstName', 'LastName', 'EmailAddress'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    console.log('missing nonstring entity field')
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  // const numberField = ['RentPayment'];
  // const nonNumberField = numberField.find(
  //   field => field in req.body && typeof req.body[field] !== 'number'
  // );

  // if (nonNumberField) {
  //   console.log('missing Number field')
  //   return res.status(422).json({
  //     code: 422,
  //     reason: 'ValidationError',
  //     message: 'Incorrect field type: expected number',
  //     location: nonNumberField
  //   });
  // }
  // If the password aren't trimmed we give an error.  Users might
  // expect that these will work without trimming (i.e. they want the password
  // "foobar ", including the space at the end).  We need to reject such values
  // explicitly so the users know what's happening, rather than silently
  // trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used
  // to log in, so it's less of a problem.
  const explicityTrimmedFields = ['password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }
//ASK TED abt removing username:
  const sizedFields = {
    password: {
      min: 6,
      // bcrypt truncates after 20 characters, so let's not give the illusion
      // of security by storing extra (unused) info
      max: 20
    }
  };
  //making sure psword is correct length
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {password, FirstName = '', LastName = '', EmailAddress , RentPayment} = req.body;
  // Username and password come in pre-trimmed, otherwise we throw an error
  // before this
  FirstName = FirstName.trim();
  LastName = LastName.trim();
  EmailAddress = EmailAddress.trim();
  password = password.trim();


  return User.find({EmailAddress})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Email Address already taken',
          location: 'EmailAddress'
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        EmailAddress,
        password: hash,
        FirstName,
        LastName,
        RentPayment: Number
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});
//declare localAuth & use .authenticate
const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
// The user provides a username and password to login: must create end point '/login'
router.post('/login', (req, res) => {
  //console.log(req);
  // const authToken = createAuthToken(req.user.serialize());
  // res.json({authToken});
  let EmailAddress = req.body.EmailAddress
  let password = User.hashPassword(req.body.password)
  User.find({EmailAddress, password })
    .count()
    .then(result => console.log("result",result));
  //res.send("we've hit");
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  
  res.json({authToken});
});

router.post('/', (req, res) => {
  console.log('users post', req.body)
  User
    .create({
      name: req.body.name
    })
    .then(
      user => res.status(201).json(user.serialize()))
    .catch(err => {
      console.error("err");
      res.status(500).json({message: 'Internal server error'});
    });
});
module.exports = router;
