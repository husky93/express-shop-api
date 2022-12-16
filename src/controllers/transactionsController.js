import async from 'async';
import { body, validationResult } from 'express-validator';
import Transactions from '../models/transactions';
import Users from '../models/users';

exports.getTransactions = (req, res) => {
  const { user } = req.query;
  if (user) {
    Transactions.find({ user })
      .populate({ path: 'items', populate: { path: 'item', model: 'Items' } })
      .exec((err, transactionList) => {
        if (err) {
          return res.status(404).json(err);
        }
        return res.json(transactionList);
      });
  } else {
    Transactions.find()
      .populate({ path: 'items', populate: { path: 'item', model: 'Items' } })
      .exec((err, transactionList) => {
        if (err) {
          return res.status(404).json(err);
        }
        return res.json(transactionList);
      });
  }
};

exports.getTransaction = (req, res) => {
  res.json({ post: 'GET' });
};

exports.postTransaction = (req, res) => {
  res.json({ post: 'POSTED' });
};

exports.updateTransaction = (req, res) => {
  res.json({ post: 'YO' });
};

exports.deleteTransaction = (req, res) => {
  res.json({ post: 'YO' });
};
