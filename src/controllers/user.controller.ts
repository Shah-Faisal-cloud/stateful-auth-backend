import type { RequestHandler } from "express";
import { deleteAccount } from "../services/user.service.js";
import successResponse from "../utils/successResponse.js";
import type { PasswordInput } from "../schemas/auth.schema.js";
import type { Types } from "mongoose";

export const deleteAccountHandler: RequestHandler = async (req, res) => {
  const password : PasswordInput = req.body.password
  const userId = req.session.userId as Types.ObjectId

  await deleteAccount(userId, password)

  res.clearCookie('connect.sid')
  res.status(200).json(successResponse('Account deleted successfully'))
}