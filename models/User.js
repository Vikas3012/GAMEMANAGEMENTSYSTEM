const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  },
  isLegal: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
