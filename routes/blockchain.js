var express = require('express');
var router = express.Router();
const { User } = require('../models/users');


router.get('/', function(req, res) {
    try {
        res.status(200).json({ message: "blockchain.js get was hit!" }); 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/', function(req, res) {
    try {
        res.status(200).json({ message: "blockchain.js put was hit!" }); 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', function(req, res) {
    try {
        res.status(200).json({ message: "blockchain.js post was hit!" }); 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/', function(req, res) {
    try {
        res.status(200).json({ message: "blockchain.js delete was hit!" }); 
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;