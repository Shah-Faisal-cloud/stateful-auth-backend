import User from "../models/user.model.js"
import { BadRequestError, InvalidCredentialsError } from "../errors/index.js"
import { comparePassword, hashPassword } from "./password.service.js"
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

export const changePassword = async (userId: Types.ObjectId, oldPassword: string, newPassword: string) => {
  const user = await User.findById(userId).select('+password')
  
  const isOldPasswordCorrect = await comparePassword(oldPassword, user!.password)
  if (!isOldPasswordCorrect) {
    throw new InvalidCredentialsError('Incorrect password')
  }

  const isNewPasswordSameAsOld = await comparePassword(newPassword, user!.password)
  if (isNewPasswordSameAsOld) {
    throw new BadRequestError('New password must be different from the current password')
  }
  
  const newPasswordHash = await hashPassword(newPassword)
  user!.password = newPasswordHash
  await user!.save()
}