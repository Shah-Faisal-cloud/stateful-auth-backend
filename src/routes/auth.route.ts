import { Router } from "express";
import validateBody from "../middleware/validate.middleware.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import { loginHandler, logoutHandler, signupHandler } from "../controllers/auth.controller.js";
import authenticate from "../middleware/auth.middleware.js";


const authRouter = Router()

authRouter.post('/signup', validateBody(signupSchema), signupHandler)
authRouter.post('/login', validateBody(loginSchema), loginHandler)
authRouter.post('/logout', authenticate, logoutHandler)

export default authRouter