import env from "../config/env.js"
import { BadRequestError, ConflictError, InvalidCredentialsError, NotFoundError } from "../errors/index.js"
import User from "../models/user.model.js"
import generateOtp from "../utils/otp.js"
import { sendPasswordResetOtpEmail } from "./email.service.js"
import { comparePassword, hashPassword } from "./password.service.js"
import { signResetToken, verifyResetToken } from "./token.service.js"

export const signupUser = async (name: string, email: string, password: string) => {
  const doesExist = await User.findOne({ email })

  if (doesExist) {
    throw new ConflictError('Email already in use')
  }

  const hashedPassword = await hashPassword(password)

  const user = await User.create({ name, email, password: hashedPassword })
  return user
} 

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new InvalidCredentialsError('Invalid email or password')
  }

  const doesPasswordMatch = await comparePassword(password, user.password)

  if (!doesPasswordMatch) {
    throw new InvalidCredentialsError('Invalid email or password')
  }
  
  return user
}

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    return 
  }

  const otp = generateOtp()
  const expiresAt = new Date(Date.now() + env.OTP_EXPIRY_MS)

  user.passwordResetOtp = otp
  user.passwordResetOtpExpiresAt = expiresAt
  await user.save()

  await sendPasswordResetOtpEmail(user.email, otp)
}

export const verifyResetOtp = async (email: string, otp: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new BadRequestError('Invalid or expired OTP')
  }

  const doesOtpMatch = otp === user.passwordResetOtp
  if (!doesOtpMatch || user.passwordResetOtpExpiresAt === null) {
    throw new BadRequestError('Invalid or expired OTP')
  }

  const isOtpExpired = user.passwordResetOtpExpiresAt!.getTime() < Date.now()
  if (isOtpExpired) {
    throw new BadRequestError('Invalid or expired OTP')
  }

  const token = signResetToken(user._id)

  user.passwordResetOtp = null
  user.passwordResetOtpExpiresAt = null
  await user.save()

  return token
}

export const resetPassword = async (token: string, newPassword: string) => {
  let payload
  
  try {
    payload = verifyResetToken(token) as { sub: string }
  } catch {
    throw new BadRequestError('Invalid or expired reset token')
  }

  const userId = payload.sub
  
  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError('User not found')
  }

  const newPasswordHash = await hashPassword(newPassword)
  
  user.password = newPasswordHash
  await user.save()
}