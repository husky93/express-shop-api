const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  item: { type: Schema.Types.ObjectId, ref: 'Items', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  description: String,
});

export default mongoose.model('Reviews', ReviewsSchema);
