import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transactions' }],
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
});

export default mongoose.model('Users', UserSchema);
