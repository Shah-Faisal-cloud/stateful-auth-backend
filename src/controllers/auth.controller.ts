import type { RequestHandler } from "express";
import type { SignupInput } from "../schemas/auth.schema.js";
import { signupUser } from "../services/auth.service.js";
import successResponse from "../utils/successResponse.js";

export const signupHandler: RequestHandler = async (req, res) => {
  const { name, email, password }: SignupInput = req.body

  const createdUser = await signupUser(name, email, password)

  req.session.userId = createdUser._id
  res.status(201).json(successResponse(
    {
    id: createdUser._id.toString(),
    name: createdUser.name,
    email: createdUser.email,
    isVerified: createdUser.isVerified
    },
    'Account Created Successfully'))
}