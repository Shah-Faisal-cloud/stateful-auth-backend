import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import validateBody from "../middleware/validate.middleware.js";
import { passwordSchema } from "../schemas/auth.schema.js";
import { deleteAccountHandler } from "../controllers/user.controller.js";
import z from "zod";


const userRouter = Router()

userRouter.delete('/account', authenticate, validateBody(z.object({ password: passwordSchema })), deleteAccountHandler)

export default userRouter