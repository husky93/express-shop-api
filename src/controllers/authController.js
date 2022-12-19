import passport from 'passport';
import jwt from 'jsonwebtoken';

const postUserLogin = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Wrong Username / Password',
        user,
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET
      );
      return res.json({ user, token });
    });
  })(req, res);
};

const getUserRefresh = (req, res) => {
  return res.json({ message: 'test' });
};

const getUserLogout = (req, res) => {
  return res.json({ message: 'test' });
};

export default {
  postUserLogin,
  getUserRefresh,
  getUserLogout,
};
