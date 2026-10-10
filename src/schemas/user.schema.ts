import z from "zod";
import { extendedPasswordSchema, otpSchema, passwordSchema } from "./shared.schema.js";


export const deleteAccountSchema = z.object({
  password: passwordSchema,
})

export const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: extendedPasswordSchema
})

export const verifyEmailSchema = z.object({
  otp: otpSchema
})


export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>