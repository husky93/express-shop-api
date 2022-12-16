import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import async from 'async';
import Users from '../models/users';

const getUser = (req, res, next) => {
  Users.findById(req.params.userId).exec((err, user) => {
    if (err) {
      next(err);
    }
    if (user == null) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  });
};

const postUser = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Username must be specified.')
    .isLength({ max: 40 })
    .withMessage('Username can be maximum 40 characters.'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    })
    .withMessage(
      'Your password needs to be at least 8 characters long, have one lowercase and one uppercase character'
    )
    .isLength({ max: 50 })
    .withMessage('Password can be be maximum 50 characters.')
    .trim()
    .escape(),
  body('address.city')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('City must be specified.')
    .isLength({ max: 150 })
    .withMessage('City can be be maximum 150 characters.'),
  body('address.zip_code')
    .notEmpty()
    .escape()
    .withMessage('Zip code must be specified.')
    .matches(/^[0-9]{2}-[0-9]{3}/)
    .withMessage('Must be Polish zip code (00-000 pattern).'),
  body('address.street')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Street name must be specified.')
    .isLength({ max: 150 })
    .withMessage('Street name can be be maximum 150 characters.'),
  body('address.house_num')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('House number must be specified.')
    .isLength({ max: 150 })
    .withMessage('House number can be be maximum 150 characters.'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    async.waterfall(
      [
        function (callback) {
          Users.find({ username: req.body.username }).exec((err, users) => {
            if (err) {
              callback(err, null);
            }
            if (users.length > 0) {
              callback(null, true);
            }
            if (users.length === 0) {
              callback(null, false);
            }
          });
        },
      ],
      (err, isUsernameTaken) => {
        if (err) {
          return res.status(404).json(err);
        }
        if (!isUsernameTaken) {
          bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
            if (error) {
              return res.status(502).json(err);
            }
            const user = new Users({
              username: req.body.username,
              password: hashedPassword,
              address: req.body.address,
            });
            user.save((saveError, result) => {
              if (err) {
                return res.status(502).json(saveError);
              }
              return res.json(result);
            });
          });
        } else {
          return res.status(400).json({ error: 'Username already taken.' });
        }
      }
    );
  },
];

const updateUser = (req, res) => {
  res.json({ users: 'YO' });
};

const deleteUser = (req, res) => {
  res.json({ users: 'YO' });
};

export default {
  getUser,
  postUser,
  updateUser,
  deleteUser,
};
