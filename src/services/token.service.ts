import type { Types } from "mongoose"
import jwt from "jsonwebtoken"
import env from "../config/env.js"

export const signResetToken = (userId: Types.ObjectId) => {
  return jwt.sign(
    {
      sub: userId
    },
    env.RESET_TOKEN_SECRET,
    {
      expiresIn: '5m'
    }
  )
}

export const verifyResetToken = (token: string) => {
  return jwt.verify(
    token,
    env.RESET_TOKEN_SECRET,
    {
      algorithms: ["HS256"]
    }
  )
}