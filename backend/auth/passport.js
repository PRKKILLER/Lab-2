/* eslint-disable no-console */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const kafka = require('../kafka/client');

function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: 'qs4ZRHiMFG',
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      const msg = {};
      console.log('jwt payload', jwtPayload);
      // eslint-disable-next-line no-underscore-dangle
      msg.id = jwtPayload._id;
      // eslint-disable-next-line consistent-return
      kafka.make_request('passport', msg, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
