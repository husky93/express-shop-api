import async from 'async';
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
        return res.status(400).json({ error: 'No items found.' });
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
        return res.status(400).json({ error: 'No items found.' });
      });
  }
};

const getItem = (req, res) => {
  res.json({ post: 'GET' });
};

const postItem = (req, res) => {
  res.json({ post: 'POSTED' });
};

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
