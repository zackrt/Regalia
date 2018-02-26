var express = require('express');
var router = express.Router();
const { User } = require('../models/users');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth,(req, res) => {

   
   try {
        User.find({}).then(allusers => {
            res.json({allusers})
        })
   } catch(err) {
       res.json({err})
   }

});

module.exports = router;