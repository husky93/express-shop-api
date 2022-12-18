import passport from 'passport';
import jwt from 'jsonwebtoken';

const postUserLogin = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
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

export default {
  postUserLogin,
};
