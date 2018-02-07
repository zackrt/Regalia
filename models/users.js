'use strict';
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  blockchains: {type:Array}
});

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

const User = mongoose.model('User', userSchema);
module.exports = {User};