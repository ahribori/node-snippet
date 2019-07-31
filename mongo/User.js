const mongoose = require('mongoose');

const User = mongoose.model('User', {
  id: String,
  socialId: String,
  deviceId: String,
  nickname: String,
  gender: String,
  age: Number,
  cash: Number,
  rating: Number,
  active: Boolean,
});

module.exports = User;
