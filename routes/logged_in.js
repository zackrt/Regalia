var express = require('express');
var router = express.Router();
const { User } = require('../models/users');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth,(req, res) => {
   console.log('GET THE USER DATA AND SEND IT TO THE PAGE')
   res.json({userdata:'this is the user data'})

});

module.exports = router;