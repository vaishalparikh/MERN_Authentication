const mongoose = require('mongoose');
// Define a schema
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 70,
    index: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
    index: true,
  },
  profilePic: {
    type: String,
  },
  location: {
    type: {
      type: String,
    },
    // AT index 0 will be longitude and At index 1 will be latitude
    coordinates: {
      type: [Number],
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  OTP: {
    otp: {
      type: String,
      maxlength: 6,
    },
    validTill: {
      type: Date,
    },
  },
}, {
  timestamps: true,
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
