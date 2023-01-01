import mongoose from 'mongoose';

const { Schema } = mongoose;

const TransactionsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: 'Items' },
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'delivered', 'payment failed', 'cancelled', 'paid'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

TransactionsSchema.virtual('total_price', {
  ref: 'Items',
  localField: 'items.*.item',
  foreignField: '_id',
}).get(function () {
  return this.items.reduce(
    (prevValue, obj) => prevValue + obj.item.price * obj.quantity,
    0
  );
});

export default mongoose.model('Transactions', TransactionsSchema);
