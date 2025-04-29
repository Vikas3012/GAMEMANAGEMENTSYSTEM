const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');


const User = require('../models/User');


router.get('/login', forwardAuthenticated, (req, res) => res.render('users/login'));


router.get('/register', forwardAuthenticated, (req, res) => res.render('users/register'));


router.post('/register', (req, res) => {
  const { age, phoneNumber, gender, isLegal, password, password2 } = req.body;
  let errors = [];


  if (!age || !phoneNumber || !password || !password2) {
    errors.push({ msg: 'Please fill in all required fields' });
  }


  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }


  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors,
      age,
      phoneNumber,
      gender,
      isLegal
    });
  } else {

    User.findOne({ phoneNumber: phoneNumber }).then(user => {
      if (user) {

        errors.push({ msg: 'Phone number is already registered' });
        res.render('users/register', {
          errors,
          age,
          phoneNumber,
          gender,
          isLegal
        });
      } else {
        const newUser = new User({
          age,
          phoneNumber,
          gender,
          isLegal: isLegal === 'true',
          password
        });


        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            newUser
              .save()
              .then(user => {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});

module.exports = router;
