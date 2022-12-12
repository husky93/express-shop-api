const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Irems' },
      quantity: Number,
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'delivered', 'payment failed', 'cancelled'],
  },
});

module.exports = mongoose.model('Transactions', TransactionsSchema);
