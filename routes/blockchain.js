import { BADFAMILY } from 'dns';

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

        mineBlock(difficulty) {
            while (this.hash.substring(0. difficulty !== Array(difficulty + 1).join("0")) {
                this.nonce++;
                this.hash = this.calculateHash();
            }

            console.log("BLOCK MINED: " + this.hash);
        }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlcok()];
        this.difficulty = 5;
    }

    createGenesisBlock() {
        return new Block(0, "02/03/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    // to validate blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

        }

        return true;
    }
}
//to create regalia connected to rent payments in feb 2, 2018
let regalia = new Blockchain();
console.log('Mining block 1...');
regalia.addBlock(new Block(1 ,"02/02/018", { amount: 1325}));

console.log('Mining block 2...');
regalia.addBlock(new Block(2, "02/02/2018", { amount: 1950}));
