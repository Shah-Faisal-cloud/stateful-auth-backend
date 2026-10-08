import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetOtp: {
    type: String,
    default: null
  },
  resetOtpExpiresAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User