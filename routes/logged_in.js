var express = require('express');
var router = express.Router();
const { User } = require('../models/users');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth,(req, res) => {

   console.log('GET THE USER DATA AND SEND IT TO THE PAGE',req.query)
   //ZACK YOU NOW HAVE THE EMAIL ADDRESS SO YOU CAN MAKE YOUR MONGOOSE CALL

   // the email address is in the variable:   req.query.EmailAddress

   User.find({EmailAddress: req.query.EmailAddress})

   res.json({userdata:'this is the user data'})

});

module.exports = router;