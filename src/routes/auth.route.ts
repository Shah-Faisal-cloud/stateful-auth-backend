import { Router } from "express";
import validateBody from "../middleware/validate.middleware.js";
import { signupSchema } from "../schemas/auth.schema.js";
import { signupHandler } from "../controllers/auth.controller.js";


const authRouter = Router()

authRouter.post('/signup', validateBody(signupSchema), signupHandler)

export default authRouter