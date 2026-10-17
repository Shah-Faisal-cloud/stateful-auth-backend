import type { Types } from "mongoose"
import jwt, { type JwtPayload } from "jsonwebtoken"
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
  const payload = jwt.verify(
    token,
    env.RESET_TOKEN_SECRET,
    {
      algorithms: ["HS256"]
    }
  )
  return payload as JwtPayload
}