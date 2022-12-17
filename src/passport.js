import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import Users from './models/users';

passport.use(
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (error, res) => {
        if (error) {
          return done(error);
        }
        if (res) {
          return done(null, user, { message: 'Logged In Successfully' });
        }
        return done(null, false, { message: 'Incorrect password' });
      });
    });
  })
);
