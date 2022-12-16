import async from 'async';
import { body, validationResult } from 'express-validator';
import Categories from '../models/categories';
import Items from '../models/items';

const getCategories = (req, res, next) => {
  Categories.find()
    .sort([['title', 'ascending']])
    .exec((err, categoriesList) => {
      if (err) {
        return next(err);
      }
      return res.json(categoriesList);
    });
};

const getCategory = (req, res, next) => {
  Categories.findById(req.params.categoryId).exec((err, category) => {
    if (err) {
      return next(err);
    }
    return res.json(category);
  });
};

const postCategory = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Title must be specified.')
    .isLength({ max: 150 })
    .withMessage('Title must be maximum 150 characters.'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Message must have at least 1 character.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const category = new Categories({
      title: req.body.title,
      description: req.body.description,
    });

    category.save((error, result) => {
      if (error) {
        return res.status(502).json(errors);
      }
      return res.json(result);
    });
  },
];

const updateCategory = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Title must be specified.')
    .isLength({ max: 150 })
    .withMessage('Title must be maximum 150 characters.'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Message must have at least 1 character.'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const category = new Categories({
      _id: req.params.categoryId,
      title: req.body.title,
      description: req.body.description,
    });

    Categories.findByIdAndUpdate(req.params.categoryId, category, {}, (err) => {
      if (err) {
        return res.status(404).json(err);
      }
      return res.json(category);
    });
  },
];

const deleteCategory = (req, res) => {
  async.waterfall(
    [
      function (callback) {
        Items.find({ category: req.params.categoryId }).exec((err, result) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, result);
        });
      },
    ],
    (err, results) => {
      if (err) return res.status(404).json(err);

      if (results && results.length > 0) {
        return res.status(403).json({
          error: 'Delete all items in this category before deleting category',
        });
      }
      Categories.findByIdAndDelete(
        req.params.categoryId,
        {},
        (error, result) => {
          if (error) return res.status(404).json(err);
          res.json(result);
        }
      );
    }
  );
};

export default {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
