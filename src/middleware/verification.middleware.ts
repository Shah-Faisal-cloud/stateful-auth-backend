import type { RequestHandler } from "express";
import type { Types } from "mongoose";
import User from "../models/user.model.js";
import { NotVerifiedError } from "../errors/index.js";

const requireVerified: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId as Types.ObjectId
  
  const user = await User.findById(userId)

  const isVerified = user!.isVerified
  if (!isVerified) {
    throw new NotVerifiedError('Please verify your email to continue.')
  }

  next()
}

export default requireVerified