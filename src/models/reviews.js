import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReviewsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  item: { type: Schema.Types.ObjectId, ref: 'Items', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  timestamp: { type: Date, default: Date.now() },
  description: String,
});

export default mongoose.model('Reviews', ReviewsSchema);
