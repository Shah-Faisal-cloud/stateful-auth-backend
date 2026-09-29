import bcrypt from 'bcryptjs'
import env from '../config/env.js'

export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)
  return hash
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  const doesMatch = await bcrypt.compare(password, hash)
  return doesMatch
}