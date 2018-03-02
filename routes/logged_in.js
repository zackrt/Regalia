var express = require('express');
var router = express.Router();
const { User } = require('../models/users');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth,(req, res) => {

   console.log('GET THE USER DATA AND SEND IT TO THE PAGE',req.query)
   //ZACK YOU NOW HAVE THE EMAIL ADDRESS SO YOU CAN MAKE YOUR MONGOOSE CALL

   // the email address is in the variable: users  req.query.EmailAddress
   try {
        User.findOne({EmailAddress: req.query.EmailAddress}).then(user => {
            res.json({user:user.serialize()})
        })
   } catch(err) {
       res.json({err})
   }

});
//delete user account
router.delete('/', jwtAuth, (req, res) => {
    console.log(req);
    try {
        User.deleteOne({EmailAddress: req.body.EmailAddress}).then(users => {
        res.status(200).json({ message: "Your Account was deleted!" })
    }) 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error, account cannot deleted' });
    }
});
//update account 
router.put('/', jwtAuth,(req, res) =>{
    try {
        User.findOneAndUpdate(
          {EmailAddress: req.body.EmailAddress},
          req.body,
          {new: true},
          (err, newUser) => {
            if (err) return res.status(500).send(err);
            res.send(newUser);
          })
    } catch (e) {
        res.status(500).json({ message: 'Internal server error, account cannot be updated' });
    }
});

module.exports = router;