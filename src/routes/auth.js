import jwt from 'jsonwebtoken';
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', (req, res) => {
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

      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
});

export default router;
