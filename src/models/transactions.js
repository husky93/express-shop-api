const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new Schema({});

module.exports = mongoose.model('Transactions', TransactionsSchema);
