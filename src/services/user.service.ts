import User from "../models/user.model.js"
import { BadRequestError, InvalidCredentialsError } from "../errors/index.js"
import { comparePassword, hashPassword } from "./password.service.js"
import mongoose, { Types } from "mongoose"
import generateOtp from "../utils/otp.js"
import env from "../config/env.js"
import { sendVerificationOtpEmail } from "./email.service.js"
import type { UpdateProfileInput } from "../schemas/user.schema.js"

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

export const requestVerificationOtp = async (userId: Types.ObjectId) => {
  const user = await User.findById(userId)

  if (user!.isVerified) {
    throw new BadRequestError('Email is already verified')
  }

  const otp = generateOtp()
  const otpExpiresAt = new Date(Date.now() + env.OTP_EXPIRY_MS)

  user!.verificationOtp = otp
  user!.verificationOtpExpiresAt = otpExpiresAt
  await user!.save()

  await sendVerificationOtpEmail(user!.email, user!.name, otp)
}

export const VerifyEmail = async (userId: Types.ObjectId, otp: string) => {
  const user = await User.findById(userId)

  const doesOtpMatch = user!.verificationOtp === otp
  if (!doesOtpMatch || user!.verificationOtpExpiresAt === null) {
    throw new BadRequestError('Invalid or expired OTP')
  }

  const isOtpExpired = user!.verificationOtpExpiresAt!.getTime() < Date.now()
  if (isOtpExpired) {
    throw new BadRequestError('Invalid or expired OTP')
  }

  user!.isVerified = true
  user!.verificationOtp = null
  user!.verificationOtpExpiresAt = null
  await user!.save()
}

export const updateProfile = async (userId: Types.ObjectId, updates: UpdateProfileInput) => {
  const user = await User.findByIdAndUpdate(userId, updates, { returnDocument: 'after', runValidators: true })
  return user
}
