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
    .withMessage('Username can be maximum 40 characters.')
    .isEmail()
    .withMessage('Username must be and email'),
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
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified.')
    .isLength({ max: 150 })
    .withMessage('Name can be maximum 150 characters.'),
  body('surname')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified.')
    .isLength({ max: 150 })
    .withMessage('Name can be maximum 150 characters.'),
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
              name: req.body.name,
              surname: req.body.surname,
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

const updateUser = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Username must be specified.')
    .isLength({ max: 100 })
    .withMessage('Username can be maximum 100 characters.')
    .isEmail()
    .withMessage('Username must be and email'),
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
    .escape()
    .optional(),
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified.')
    .isLength({ max: 150 })
    .withMessage('Name can be maximum 150 characters.'),
  body('surname')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified.')
    .isLength({ max: 150 })
    .withMessage('Name can be maximum 150 characters.'),
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    async.waterfall(
      [
        function (callback) {
          Users.findById(req.params.userId)
            .select('+password')
            .exec((err, user) => {
              if (err) {
                return callback(err, null);
              }
              if (user) {
                return callback(null, user.password);
              }
              callback(null, null);
            });
        },
      ],
      (err, password) => {
        if (err) return res.status(404).json(err);
        if (req.body.password) {
          bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
            if (error) {
              return res.status(502).json(err);
            }
            const user = new Users({
              _id: req.params.userId,
              username: req.body.username,
              password: hashedPassword,
              address: req.body.address,
            });
            Users.findByIdAndUpdate(
              req.params.userId,
              user,
              {},
              (updateError, result) => {
                if (updateError) return res.status(404).json(updateError);
                return res.json(result);
              }
            );
          });
        } else {
          const user = new Users({
            _id: req.params.userId,
            username: req.body.username,
            password,
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
          });
          Users.findByIdAndUpdate(
            req.params.userId,
            user,
            {},
            (updateError, result) => {
              if (updateError) return res.status(404).json(updateError);
              return res.json(result);
            }
          );
        }
      }
    );
  },
];

const deleteUser = (req, res) => {
  Users.findByIdAndDelete(req.params.userId, {}, (err, result) => {
    if (err) return res.status(404).json(err);
    return res.json(result);
  });
};

export default {
  getUser,
  postUser,
  updateUser,
  deleteUser,
};
