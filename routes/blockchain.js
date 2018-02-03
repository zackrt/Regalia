var express = require('express');
var router = express.Router();
const { User } = require('../models/users');


router.post('/', function(req, res) {
    try {
        res.status(200).json({ message: "I am here with 1325 regalia" }); 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/delete', function(req, res) {
    try {
        res.status(200).json({ message: "blockchain.js delete was hit!" }); 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;