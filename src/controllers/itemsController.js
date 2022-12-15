import async from 'async';
import { body, validationResult } from 'express-validator';
import Categories from '../models/categories';
import Items from '../models/items';

const getItems = (req, res, next) => {
  const { category } = req.query;

  if (category) {
    async.waterfall(
      [
        function (callback) {
          Categories.findOne({ title: category.toLowerCase() }).exec(
            (err, categoryData) => {
              if (err) {
                return callback(err, null);
              }
              return callback(null, categoryData);
            }
          );
        },
        function (categoryData, callback) {
          if (categoryData) {
            const id = categoryData._id;
            Items.find({ category: id })
              .populate('category')
              .exec((err, itemsList) => {
                if (err) {
                  return callback(err, null);
                }
                return callback(null, itemsList);
              });
          } else {
            return callback(
              res.status(400).json({ error: 'Category not found.' }),
              null
            );
          }
        },
      ],
      (err, results) => {
        if (err) {
          return next(err);
        }
        if (results.length > 0) return res.json(results);
        return res.status(404).json({ error: 'No items found.' });
      }
    );
  } else {
    Items.find()
      .populate('category')
      .exec((err, itemsList) => {
        if (err) {
          return next(err);
        }
        if (itemsList.length > 0) return res.json(itemsList);
        return res.status(404).json({ error: 'No items found.' });
      });
  }
};

const getItem = (req, res) => {
  Items.findById(req.params.itemId)
    .populate('category')
    .exec((err, item) => {
      if (err) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      return res.json(item);
    });
};

const postItem = [
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
  body('price')
    .isNumeric()
    .notEmpty()
    .escape()
    .withMessage('Enter a valid price.'),
  body('num_in_stock')
    .isInt()
    .notEmpty()
    .escape()
    .withMessage('Enter a valid number.'),
  body('category')
    .notEmpty()
    .escape()
    .withMessage('Category must be specified'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const item = new Items({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      num_in_stock: req.body.num_in_stock,
      category: req.body.category,
    });

    item.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.json(result);
    });
  },
];

const updateItem = (req, res) => {
  res.json({ post: 'YO' });
};

const deleteItem = (req, res) => {
  res.json({ post: 'YO' });
};

const getReviews = (req, res) => {
  res.json({ post: 'YO' });
};

const postReview = (req, res) => {
  res.json({ post: 'YO' });
};

const updateReview = (req, res) => {
  res.json({ post: 'YO' });
};

const deleteReview = (req, res) => {
  res.json({ post: 'YO' });
};

export default {
  getItems,
  getItem,
  postItem,
  updateItem,
  deleteItem,
  getReviews,
  postReview,
  updateReview,
  deleteReview,
};
