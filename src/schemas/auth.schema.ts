import z from "zod";
import { emailSchema, extendedPasswordSchema, otpSchema, passwordSchema } from "./shared.schema.js";


export const signupSchema = z.object({
  name: z.string().trim().min(3).max(20),
  email: emailSchema,
  password: extendedPasswordSchema
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export const forgotPasswordSchema = z.object({
  email: emailSchema
})

export const verifyResetOtpSchema = z.object({
  email: emailSchema,
  otp: otpSchema
})

export const resetPasswordSchema = z.object({
  resetToken: z.string(),
  newPassword: extendedPasswordSchema
})


export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type VerifyResetOtpInput = z.infer<typeof verifyResetOtpSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
