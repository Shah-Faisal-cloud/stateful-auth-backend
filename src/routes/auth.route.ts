import { Router } from "express";
import validateBody from "../middleware/validate.middleware.js";
import { forgotPasswordSchema, loginSchema, resetPasswordSchema, signupSchema, verifyResetOtpSchema } from "../schemas/auth.schema.js";
import { forgotPasswordHandler, loginHandler, logoutHandler, resetPasswordHandler, signupHandler, verifyResetOtpHandler } from "../controllers/auth.controller.js";
import authenticate from "../middleware/auth.middleware.js";


const authRouter = Router()

authRouter.post('/signup', validateBody(signupSchema), signupHandler)
authRouter.post('/login', validateBody(loginSchema), loginHandler)
authRouter.post('/logout', authenticate, logoutHandler)
authRouter.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPasswordHandler)
authRouter.post('/verify-reset-otp', validateBody(verifyResetOtpSchema), verifyResetOtpHandler)
authRouter.post('/reset-password', validateBody(resetPasswordSchema), resetPasswordHandler)

export default authRouter