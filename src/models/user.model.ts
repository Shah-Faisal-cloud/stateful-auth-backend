import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('User', userSchema)

export default User