var express = require('express');
var router = express.Router();
const { User } = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function(req, res) {
  console.log('users post', req.body)
  User.create({
    email:req.body.email,
    password:req.body.password,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    rentpayment:req.rentpayment
      
  }).then(user => res.status(201).send("User registered"))
  .catch(err => { console.error("err"); res.status(500).json({message: 'Internal server error'}); });
});
module.exports = router;
