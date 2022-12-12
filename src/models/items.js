const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemsSchema = new Schema({});

module.exports = mongoose.model('Items', ItemsSchema);
