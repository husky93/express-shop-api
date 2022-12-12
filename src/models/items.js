const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemsSchema = new Schema({
  title: { type: String, required: true, maxLength: 150 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  price: { type: Number, required: true },
  num_in_stock: { type: Number, required: true },
});

module.exports = mongoose.model('Items', ItemsSchema);
