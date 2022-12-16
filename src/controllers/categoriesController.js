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
        return res.status(500).json(errors);
      }
      return res.json(result);
    });
  },
];

const updateCategory = (req, res) => {
  res.json({ post: 'YO' });
};

const deleteCategory = (req, res) => {
  res.json({ post: 'YO' });
};

export default {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
