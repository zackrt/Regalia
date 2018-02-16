'use strict';
const mongoose = require('mongoose');

<<<<<<< HEAD
const bcrypt = require ('bcryptjs');

// this is our schema to represent a restaurant
=======
>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee
const userSchema = mongoose.Schema({
  EmailAddress: {type: String, required: true},
  password: {type: String,required: true},
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  RentPayment: {type: Number, required:true},
  blockchains: {type:Array}
});

<<<<<<< HEAD
userSchema.virtual('FullName').get(function() {
  return `${this.FirstName} ${this.LastName}`.trim()});
userSchema.virtual('username').get(function() {
  return `${this.EmailAddress}`.trim()});
=======
userSchema.virtual('addressString').get(function() {
  return `${this.address.building} ${this.address.street}`.trim()});

userSchema.virtual('grade').get(function() {
  const gradeObj = this.grades.sort((a, b) => {return b.date - a.date})[0] || {};
  return gradeObj.grade;
});
>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee

userSchema.methods.serialize = function() {
  return {
    id: this._id,
<<<<<<< HEAD
    username: this.username,
    EmailAddress: this.EmailAddress,
    FullName: this.FullName,
    RentPayment: this.RentPayment
  };
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};
// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
=======
    name: this.name,
    blockchains: this.blockchains
  };
}

>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee
const User = mongoose.model('User', userSchema);
module.exports = {User};