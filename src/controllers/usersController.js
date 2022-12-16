import { nextTick } from 'async';
import { body, validationResult } from 'express-validator';
import Users from '../models/users';

const getUser = (req, res, next) => {
  Users.findById(req.params.categoryId)
    .select('+password')
    .exec((err, user) => {
      if (err) {
        next(err);
      }
      if (user == null)
        return res.status(404).json({ error: 'User not found' });
      return res.json(user);
    });
};

const postUser = (req, res) => {
  res.json({ user: 'POSTED' });
};

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
