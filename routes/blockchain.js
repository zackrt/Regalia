var express = require('express');
var router = express.Router();
const { User } = require('../models/users');
/* GET users listing. */
router.post('/', function(req, res, next) {
    res.status(200).json({ messsage: "I am here with 1325 regalia" }); 
  // console.log(req.body)
  // console.log(req.body.id)
//   try {
    // let newBlockchain = new Blockchain();
//     User.findOneAndUpdate({ _id: req.body.id}, 
//         { $push: { blockchains: newBlockchain } }, 
//         {new: true}, 
//         function (err, user) {
//             if(err) {
//                 res.status(500).json({ message: 'Internal server error' });
//             } else {
//                 res.status(200).json({ user: user });
//             }
//     });
//   } catch (e) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
});
router.delete('/d', function(req, res, next) {
  // console.log(req.body)
   console.log('delete = ' + req.body.index)
   console.log('delete = ' + req.body.user)
  try {
    let newBlockchain = new Blockchain();
    User.delete({ name: req.body.user}, 
      { $push: { blockchains: newBlockchain } }, 
      {new: true}, 
      function (err, user) {
        if(err) {
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(200).json({ user: user });
        }
  });
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }
    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
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
module.exports = router;