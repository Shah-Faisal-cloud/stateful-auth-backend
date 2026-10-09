import { Router } from "express";
import validateBody from "../middleware/validate.middleware.js";
import { emailSchema, loginSchema, otpSchema, signupSchema } from "../schemas/auth.schema.js";
import { forgotPasswordHandler, loginHandler, logoutHandler, signupHandler, verifyResetOtpHandler } from "../controllers/auth.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import z from "zod";


const authRouter = Router()

authRouter.post('/signup', validateBody(signupSchema), signupHandler)
authRouter.post('/login', validateBody(loginSchema), loginHandler)
authRouter.post('/logout', authenticate, logoutHandler)
authRouter.post('/forgot-password', validateBody(z.object({ email: emailSchema })), forgotPasswordHandler)
authRouter.post('/verify-reset-otp', validateBody(z.object({ email: emailSchema, otp: otpSchema })), verifyResetOtpHandler)

export default authRouter