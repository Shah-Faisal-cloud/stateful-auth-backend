import { ConflictError } from "../errors/index.js"
import User from "../models/user.model.js"
import { hashPassword } from "./password.service.js"

export const signupUser = async (name: string, email: string, password: string) => {
  const doesExist = await User.findOne({ email })

  if (doesExist) {
    throw new ConflictError('User Already Exists')
  }

  const hashedPassword = await hashPassword(password)

  const user = await User.create({ name, email, password: hashedPassword })
  return user
} 