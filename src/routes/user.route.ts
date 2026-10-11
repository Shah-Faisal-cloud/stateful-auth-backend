import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import validateBody from "../middleware/validate.middleware.js";
import { changePasswordHandler, deleteAccountHandler, getMeHandler, requestVerificationOtpHandler, updateProfileHandler, verifyEmailHandler } from "../controllers/user.controller.js";
import { changePasswordSchema, deleteAccountSchema, updateProfileSchema, verifyEmailSchema } from "../schemas/user.schema.js";
import requireVerified from "../middleware/verification.middleware.js";


const userRouter = Router()

userRouter.delete('/account', authenticate, requireVerified, validateBody(deleteAccountSchema), deleteAccountHandler)
userRouter.post('/password', authenticate, requireVerified, validateBody(changePasswordSchema), changePasswordHandler)
userRouter.post('/verification-otp', authenticate, requestVerificationOtpHandler)
userRouter.post('/verify-email', authenticate, validateBody(verifyEmailSchema), verifyEmailHandler)
userRouter.get('/me', authenticate, getMeHandler)
userRouter.patch('/me', authenticate, validateBody(updateProfileSchema), updateProfileHandler)

export default userRouter