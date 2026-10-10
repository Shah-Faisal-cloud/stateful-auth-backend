import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import validateBody from "../middleware/validate.middleware.js";
import { changePasswordHandler, deleteAccountHandler, requestVerificationOtpHandler } from "../controllers/user.controller.js";
import { changePasswordSchema, deleteAccountSchema } from "../schemas/user.schema.js";


const userRouter = Router()

userRouter.delete('/account', authenticate, validateBody(deleteAccountSchema), deleteAccountHandler)
userRouter.post('/password', authenticate, validateBody(changePasswordSchema), changePasswordHandler)
userRouter.post('/verification-otp', authenticate, requestVerificationOtpHandler)

export default userRouter