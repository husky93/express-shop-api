import mongoose from 'mongoose';

const { Schema } = mongoose;

const ItemsSchema = new Schema({
  title: { type: String, required: true, maxLength: 150 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  price: { type: Number, required: true },
  num_in_stock: { type: Number, required: true },
});

export default mongoose.model('Items', ItemsSchema);
