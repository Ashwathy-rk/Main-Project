// users.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  address: { type: String, required: true },
  role: {
    type: String,
    enum: ['customer', 'landowner', 'dealer', 'admin','parcher'],
    default: 'customer',
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
