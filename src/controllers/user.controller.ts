import type { RequestHandler } from "express";
import { changePassword, deleteAccount, requestVerificationOtp, VerifyEmail } from "../services/user.service.js";
import successResponse from "../utils/successResponse.js";
import type { Types } from "mongoose";
import type { ChangePasswordInput, DeleteAccountInput, VerifyEmailInput } from "../schemas/user.schema.js";

export const deleteAccountHandler: RequestHandler<{}, {}, DeleteAccountInput> = async (req, res) => {
  const password = req.body.password
  const userId = req.session.userId as Types.ObjectId

  await deleteAccount(userId, password)

  res.clearCookie('connect.sid')
  res.status(200).json(successResponse('Account deleted successfully'))
}

export const changePasswordHandler: RequestHandler<{}, {}, ChangePasswordInput> = async (req, res) => {
  const userId = req.session.userId as Types.ObjectId
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  await changePassword(userId, oldPassword, newPassword)

  res.status(200).json(successResponse('Password changed successfully'))
}

export const requestVerificationOtpHandler: RequestHandler = async (req, res) => {
  const userId = req.session.userId as Types.ObjectId

  await requestVerificationOtp(userId)

  res.status(200).json(successResponse('OTP sent to your email'))
}

export const verifyEmailHandler: RequestHandler<{}, {}, VerifyEmailInput> = async (req, res) => {
  const userId = req.session.userId as Types.ObjectId
  const otp = req.body.otp

  await VerifyEmail(userId, otp)

  res.status(200).json(successResponse('Email verified successfully'))
}
