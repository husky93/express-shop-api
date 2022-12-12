const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  title: { type: String, required: true, maxLength: 150 },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Categories', CategoriesSchema);
