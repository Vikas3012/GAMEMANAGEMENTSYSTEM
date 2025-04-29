const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true,
    trim: true
  },
  numberOfPlayer: {
    type: Number,
    required: true
  },
  gameDuration: {
    type: Number,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
