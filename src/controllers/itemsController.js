import async from 'async';
import { body, validationResult } from 'express-validator';
import Categories from '../models/categories';
import Items from '../models/items';
import Reviews from '../models/reviews';
import Users from '../models/users';

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
  body('margin')
    .isNumeric({ min: 1, max: 100 })
    .notEmpty()
    .escape()
    .withMessage('Enter a valid margin.'),
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
    const profit = req.body.price * (req.body.margin / 100);
    const gross = (parseInt(req.body.price, 10) + profit) * 1.23;

    console.log(gross, profit);

    const item = new Items({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      margin: req.body.margin,
      profit: profit.toFixed(2),
      price_gross: gross.toFixed(2),
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

const updateItem = [
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
  body('margin')
    .isNumeric({ min: 1, max: 100 })
    .notEmpty()
    .escape()
    .withMessage('Enter a valid margin.'),
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
    const profit = req.body.price * (req.body.margin / 100);
    const gross = (parseInt(req.body.price, 10) + profit) * 1.23;

    const item = new Items({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      profit,
      price_gross: gross,
      margin: req.body.margin,
      num_in_stock: req.body.num_in_stock,
      category: req.body.category,
      _id: req.params.itemId,
    });

    Items.findByIdAndUpdate(req.params.itemId, item, {}, (err, updatedItem) => {
      if (err) {
        return res.status(404).json(err);
      }
      return res.json(item);
    });
  },
];

const deleteItem = (req, res, next) => {
  async.parallel(
    [
      function (callback) {
        Items.findByIdAndDelete(req.params.itemId).exec((err, item) => {
          if (err) {
            return res.status(400).json(err);
          }
          if (item == null) {
            return res.status(404).json({ error: 'Item not found' });
          }
          return callback(null, item);
        });
      },
      function (callback) {
        Reviews.deleteMany({ item: req.params.itemId }).exec((err, items) => {
          if (err) {
            return res.status(400).json(err);
          }
          return callback(null, items);
        });
      },
    ],
    (err, results) => {
      if (err) {
        return res.status(404).json(err);
      }
      return res.json(results);
    }
  );
};

const getReviews = (req, res) => {
  Reviews.find({ item: req.params.itemId })
    .populate({ path: 'user', model: Users })
    .exec((err, reviewsList) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (reviewsList.length > 0) return res.json(reviewsList);
      return res.status(404).json({ error: 'No reviews found.' });
    });
};

const postReview = [
  body('user')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('User ID must be specified.'),
  body('item')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Item ID must be specified'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description must have at least 1 character.'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .notEmpty()
    .escape()
    .withMessage('Rating must be a number between 1-5.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const review = new Reviews({
      user: req.body.user,
      item: req.body.item,
      description: req.body.description,
      rating: req.body.rating,
    });

    review.save((err, result) => {
      if (err) return res.status(400).json(err);

      return res.json(result);
    });
  },
];
const updateReview = [
  body('user')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('User ID must be specified.'),
  body('item')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Item ID must be specified'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description must have at least 1 character.'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .notEmpty()
    .escape()
    .withMessage('Rating must be a number between 1-5.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const review = new Reviews({
      _id: req.params.reviewId,
      user: req.body.user,
      item: req.body.item,
      description: req.body.description,
      rating: req.body.rating,
    });

    Reviews.findByIdAndUpdate(
      req.params.reviewId,
      review,
      {},
      (err, updatedReview) => {
        if (err) {
          return res.status(404).json(err);
        }
        return res.json(review);
      }
    );
  },
];

const deleteReview = (req, res) => {
  Reviews.findByIdAndDelete(req.params.reviewId).exec((err, review) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (review == null) {
      return res.status(404).json({ error: 'Review not found' });
    }
    return res.json(review);
  });
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
