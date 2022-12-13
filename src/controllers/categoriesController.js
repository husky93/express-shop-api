import Categories from '../models/categories';

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

const getCategory = (req, res) => {
  res.json({ post: 'GET' });
};

const postCategory = (req, res) => {
  res.json({ post: 'POSTED' });
};

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
