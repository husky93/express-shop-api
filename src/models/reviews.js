const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  description: String,
});

module.exports = mongoose.model('Reviews', ReviewsSchema);
