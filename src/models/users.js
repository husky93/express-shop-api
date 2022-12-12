const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({});

module.exports = mongoose.model('Users', UserSchema);
