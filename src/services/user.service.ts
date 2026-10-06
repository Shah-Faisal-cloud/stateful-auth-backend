import User from "../models/user.model.js"
import { InvalidCredentialsError } from "../errors/index.js"
import { comparePassword } from "./password.service.js"
import mongoose, { Types } from "mongoose"

export const deleteAccount = async (userId: Types.ObjectId, password: string) => {

  const user = await User.findById(userId).select('+password')
  const doesPasswordMatch = await comparePassword(password, user!.password)
  
  if (!doesPasswordMatch) {
    throw new InvalidCredentialsError('Password is incorrect')
  }

  await User.findByIdAndDelete(userId)
  await mongoose.connection.collection('sessions').deleteMany({ "session.userId": userId})
}