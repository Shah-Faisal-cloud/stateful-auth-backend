import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import validateBody from "../middleware/validate.middleware.js";
import { extendedPasswordSchema, passwordSchema } from "../schemas/auth.schema.js";
import { changePasswordHandler, deleteAccountHandler } from "../controllers/user.controller.js";
import z from "zod";


const userRouter = Router()

userRouter.delete('/account', authenticate, validateBody(z.object({ password: passwordSchema })), deleteAccountHandler)
userRouter.post('/password', authenticate, validateBody(z.object({ oldPassword: passwordSchema, newPassword: extendedPasswordSchema })), changePasswordHandler)

export default userRouter