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
//
router.delete('/', function(req, res) {
    try {
        User.delete()
        res.status(200).json({ message: "Your Account was deleted!" }); 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
//update
router.put('/', function(req, res) {
    try {
        Users.up
        res.status(200).json({ message: "blockchain.js put was hit!" }); 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;