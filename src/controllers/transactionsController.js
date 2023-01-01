import { body, validationResult } from 'express-validator';
import Transactions from '../models/transactions';

const getTransactions = (req, res) => {
  const { user, recent } = req.query;
  if (user) {
    Transactions.find({ user })
      .populate({ path: 'items', populate: { path: 'item', model: 'Items' } })
      .exec((err, transactionList) => {
        if (err) {
          return res.status(404).json(err);
        }
        return res.json(transactionList);
      });
  } else if (recent) {
    Transactions.find()
      .sort({ createdAt: -1 })
      .limit(10)
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

const getTransaction = (req, res) => {
  Transactions.findById(req.params.transactionId)
    .populate('user')
    .populate({ path: 'items', populate: { path: 'item', model: 'Items' } })
    .exec((err, transaction) => {
      if (err) {
        return res.status(404).json(err);
      }
      if (transaction == null) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      return res.json(transaction);
    });
};

const postTransaction = [
  body('user')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('User ID must be specified.'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('"items" key value must be an array with at least one value'),
  body('items.*.item')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('All items in transaction need to have ID specified'),
  body('items.*.quantity')
    .trim()
    .isInt({ min: 1 })
    .escape()
    .withMessage(
      'All items quantity in transaction need to be integer with min value of 1'
    ),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const transaction = new Transactions({
      user: req.body.user,
      items: req.body.items,
    });

    transaction.save((err) => {
      if (err) return res.status(400).json(err);
      return res.json(transaction);
    });
  },
];
const updateTransaction = [
  body('user')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('User ID must be specified.'),
  body('items.*.item')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('All items in transaction need to have ID specified'),
  body('items.*.quantity')
    .trim()
    .isInt({ min: 1 })
    .escape()
    .withMessage(
      'All items quantity in transaction need to be integer with min value of 1'
    ),
  body('status')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Status not specified')
    .isIn(['pending', 'delivered', 'payment failed', 'cancelled', 'paid'])
    .withMessage(
      'Status must be one of these values: pending, delivered, payment failed, cancelled, paid'
    ),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const transaction = new Transactions({
      _id: req.params.transactionId,
      user: req.body.user,
      items: req.body.items,
      status: req.body.status,
    });

    Transactions.findByIdAndUpdate(
      req.params.transactionId,
      transaction,
      {},
      (err, result) => {
        if (err) return res.status(404).json(err);
        if (result == null) {
          return res.status(404).json({ error: 'Transaction not found' });
        }
        return res.json(transaction);
      }
    );
  },
];

const deleteTransaction = (req, res) => {
  Transactions.findByIdAndDelete(req.params.transactionId).exec(
    (err, result) => {
      if (err) return res.status(400).json(err);

      if (result == null) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      return res.json(result);
    }
  );
};

export default {
  getTransaction,
  getTransactions,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};
