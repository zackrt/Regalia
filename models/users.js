'use strict';
const mongoose = require('mongoose');
// this is our schema to represent a restaurant
const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  blockchains: {type:Array}
});
// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the address object
// we're storing in Mongo.
userSchema.virtual('addressString').get(function() {
  return `${this.address.building} ${this.address.street}`.trim()});
// this virtual grabs the most recent grade for a restaurant.
userSchema.virtual('grade').get(function() {
  const gradeObj = this.grades.sort((a, b) => {return b.date - a.date})[0] || {};
  return gradeObj.grade;
});
// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
userSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name
  };
}
// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const User = mongoose.model('User', userSchema);
module.exports = {User};