const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'phoneNumber' }, (phoneNumber, password, done) => {

      User.findOne({
        phoneNumber: phoneNumber
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That phone number is not registered' });
        }


        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};
