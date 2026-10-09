import z from "zod";

export const emailSchema = z.string().trim().max(254).toLowerCase().pipe(z.email())

export const passwordSchema = z.string().min(1).max(64)

export const extendedPasswordSchema = passwordSchema.min(8).regex(/[a-z]/).regex(/[0-9]/)

export const signupSchema = z.object({
  name: z.string().trim().min(3).max(20),
  email: emailSchema,
  password: extendedPasswordSchema
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export const otpSchema = z.string().length(6)

export type EmailInput = z.infer<typeof emailSchema>
export type PasswordInput = z.infer<typeof passwordSchema>
export type ExtendedPasswordInput = z.infer<typeof extendedPasswordSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type OtpInput = z.infer<typeof otpSchema>
