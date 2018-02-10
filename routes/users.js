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
    EmailAddress:req.body.EmailAddress,
    UserName:req.body.UserName,
    password:req.body.password,
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    RentPayment:req.body.RentPayment
      
  }).then(user => { 
    console.log("registered");
    res.status(201).send(user.serialize());})
  .catch(err => {
     console.error("err"); 
     res.status(500).json({message: 'Internal server error'}); });
});
module.exports = router;
