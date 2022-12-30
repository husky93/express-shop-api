import mongoose from 'mongoose';

const { Schema } = mongoose;

const ItemsSchema = new Schema({
  title: { type: String, required: true, maxLength: 150 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  price: { type: Number, required: true },
  price_gross: Number,
  profit: Number,
  margin: { type: Number, required: true, min: 1, max: 100 },
  num_in_stock: { type: Number, required: true },
});

export default mongoose.model('Items', ItemsSchema);
