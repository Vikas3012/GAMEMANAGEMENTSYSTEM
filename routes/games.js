const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


const Game = require('../models/Game');


router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const games = await Game.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('games/index', { games });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while fetching games');
    res.redirect('/dashboard');
  }
});


router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('games/new');
});


router.post('/', ensureAuthenticated, async (req, res) => {
  const { gameName, numberOfPlayer, gameDuration, platform } = req.body;
  let errors = [];


  if (!gameName || !numberOfPlayer || !gameDuration || !platform) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('games/new', {
      errors,
      gameName,
      numberOfPlayer,
      gameDuration,
      platform
    });
  } else {
    try {
      const newGame = new Game({
        gameName,
        numberOfPlayer,
        gameDuration,
        platform,
        user: req.user.id
      });

      await newGame.save();
      req.flash('success_msg', 'Game added successfully');
      res.redirect('/games');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred while adding the game');
      res.redirect('/games/new');
    }
  }
});


router.get('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);


    if (game.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/games');
    }

    res.render('games/show', { game });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Game not found');
    res.redirect('/games');
  }
});


router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);


    if (game.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/games');
    }

    res.render('games/edit', { game });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Game not found');
    res.redirect('/games');
  }
});


router.put('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);


    if (game.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/games');
    }


    game.numberOfPlayer = req.body.numberOfPlayer;
    game.gameDuration = req.body.gameDuration;
    game.platform = req.body.platform;

    await game.save();
    req.flash('success_msg', 'Game updated successfully');
    res.redirect('/games');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while updating the game');
    res.redirect(`/games/${req.params.id}/edit`);
  }
});


router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);


    if (game.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/games');
    }

    await Game.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Game removed successfully');
    res.redirect('/games');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred while deleting the game');
    res.redirect('/games');
  }
});

module.exports = router;
