const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewsSchema = new Schema({});

module.exports = mongoose.model('Reviews', ReviewsSchema);
