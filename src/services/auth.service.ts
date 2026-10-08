import env from "../config/env.js"
import { ConflictError, InvalidCredentialsError } from "../errors/index.js"
import User from "../models/user.model.js"
import generateOtp from "../utils/otp.js"
import { sendPasswordResetOtp } from "./email.service.js"
import { comparePassword, hashPassword } from "./password.service.js"

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

  user.resetOtp = otp
  user.resetOtpExpiresAt = expiresAt
  await user.save()

  await sendPasswordResetOtp(user.email, otp)
}

