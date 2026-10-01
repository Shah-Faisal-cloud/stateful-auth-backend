import type { RequestHandler } from "express";
import type { LoginInput, SignupInput } from "../schemas/auth.schema.js";
import { loginUser, signupUser } from "../services/auth.service.js";
import successResponse from "../utils/successResponse.js";

export const signupHandler: RequestHandler = async (req, res) => {
  const { name, email, password }: SignupInput = req.body;

  const createdUser = await signupUser(name, email, password);

  req.session.userId = createdUser._id;
  res.status(201).json(
    successResponse(
      {
        id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
        isVerified: createdUser.isVerified,
      },
      "Account created successfully",
    ),
  );
};

export const loginHandler: RequestHandler = async (req, res) => {
  const { email, password }: LoginInput = req.body;

  const user = await loginUser(email, password);

  req.session.userId = user._id;
  res.status(200).json(
    successResponse(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
      "Logged in successfully",
    ),
  );
};
