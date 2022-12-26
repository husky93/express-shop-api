import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  address: {
    city: { type: String, required: true, maxLength: 150 },
    zip_code: { type: String, required: true, match: /^[0-9]{2}-[0-9]{3}/ },
    street: { type: String, required: true, maxLength: 150 },
    house_num: { type: String, required: true, maxLength: 150 },
  },
  isAdmin: Boolean,
});

export default mongoose.model('Users', UserSchema);
