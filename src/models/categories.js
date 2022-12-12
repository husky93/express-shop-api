const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategoriesSchema = new Schema({});

module.exports = mongoose.model('Categories', CategoriesSchema);
