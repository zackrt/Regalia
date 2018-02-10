'use strict';
const mongoose = require('mongoose');

const bcrypt = require ('bcryptjs');

// this is our schema to represent a restaurant
const userSchema = mongoose.Schema({
  EmailAddress: {type: String, required: true},
  UserName: {type: String, require:true},
  password: {type: String,required: true},
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  RentPayment: {type: Number, required:true},
  
  blockchains: {type:Array}
});
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
    FullName: this.FullName,
    EmailAddress: this.EmailAddress,
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