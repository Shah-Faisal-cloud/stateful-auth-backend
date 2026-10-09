import z from "zod";
import { extendedPasswordSchema, passwordSchema } from "./shared.schema.js";


export const deleteAccountSchema = z.object({
  password: passwordSchema,
})

export const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: extendedPasswordSchema
})


export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>