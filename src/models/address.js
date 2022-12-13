const mongoose = require('mongoose');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  city: { type: String, required: true, maxLength: 150 },
  zip_code: { type: String, required: true, match: /^[0-9]{2}-[0-9]{3}/ },
  street: { type: String, required: true, maxLength: 150 },
  house_num: { type: String, required: true, maxLength: 150 },
});

export default mongoose.model('Address', AddressSchema);
