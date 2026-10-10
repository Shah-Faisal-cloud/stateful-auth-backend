import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import validateBody from "../middleware/validate.middleware.js";
import { changePasswordHandler, deleteAccountHandler, getMeHandler, requestVerificationOtpHandler, verifyEmailHandler } from "../controllers/user.controller.js";
import { changePasswordSchema, deleteAccountSchema, verifyEmailSchema } from "../schemas/user.schema.js";


const userRouter = Router()

userRouter.delete('/account', authenticate, validateBody(deleteAccountSchema), deleteAccountHandler)
userRouter.post('/password', authenticate, validateBody(changePasswordSchema), changePasswordHandler)
userRouter.post('/verification-otp', authenticate, requestVerificationOtpHandler)
userRouter.post('/verify-email', authenticate, validateBody(verifyEmailSchema), verifyEmailHandler)
userRouter.get('/me', authenticate, getMeHandler)

export default userRouter