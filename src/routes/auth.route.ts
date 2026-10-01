import { Router } from "express";
import validateBody from "../middleware/validate.middleware.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import { loginHandler, signupHandler } from "../controllers/auth.controller.js";


const authRouter = Router()

authRouter.post('/signup', validateBody(signupSchema), signupHandler)
authRouter.post('/login', validateBody(loginSchema), loginHandler)

export default authRouter