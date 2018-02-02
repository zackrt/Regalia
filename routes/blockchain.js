'use strict';
var express = require('express');
var router = express.Router();

/* GET blockchain page. */

//first attempt

const SHA256 = require("crypto-js/sha256");

//Create the class Block with parameters = index, timestamp, data & previous hash
class Block {
        constructor(index, timestamp, data, previous = '') {
            this.index = index;
            this.previousHash;
            this.timestamp = timestamp;
            this.data = data;
            this.hash = this.calculateHash();
            this.nonce = 0;

        }

        calculateHash() {
            return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
        }
}