var express = require('express');
var router = express.Router();

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
