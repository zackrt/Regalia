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
// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the address object
// we're storing in Mongo.
userSchema.virtual('FullName').get(function() {
  return `${this.FirstName} ${this.LastName}`.trim()});

// userSchema.virtual('Regalia').get(function() {
//   return this.RentPayment;
// })
// this virtual creates a full name from first and last name, this works with .serialize

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
userSchema.methods.serialize = function() {
  return {
    id: this._id,
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

userSchema.virtual('addressString').get(function() {
  return `${this.address.building} ${this.address.street}`.trim()});

userSchema.virtual('grade').get(function() {
  const gradeObj = this.grades.sort((a, b) => {return b.date - a.date})[0] || {};
  return gradeObj.grade;
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    blockchains: this.blockchains
  };
}

>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee
const User = mongoose.model('User', userSchema);
module.exports = {User};