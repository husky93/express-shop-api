const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transactions' }],
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
});

module.exports = mongoose.model('Users', UserSchema);