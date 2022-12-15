import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  title: { type: String, required: true, maxLength: 150 },
  description: { type: String, required: true },
});

export default mongoose.model('Categories', CategoriesSchema);
