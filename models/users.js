'use strict';
const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = mongoose.Schema({
  EmailAddress: {type: String, required: true},
  password: {type: String,required: true},
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  RentPayment: {type: Number, required:true},
  blockchains: {type:Array}
});

userSchema.virtual('FullName').get(function() {
  return `${this.FirstName} ${this.LastName}`.trim()});
userSchema.virtual('username').get(function() {
  return `${this.EmailAddress}`.trim()});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    EmailAddress: this.EmailAddress,
    FirstName: this.FirstName,
    LastName: this.LastName,
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
const User = mongoose.model('User', userSchema);
module.exports = {User};