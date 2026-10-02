import type { RequestHandler } from "express";
import { NotAuthenticatedError } from "../errors/index.js";

const authenticate: RequestHandler = (req, res, next) => {
  if (!(req.session.userId)) {
    throw new NotAuthenticatedError('You need to log in to continue')
  }
  next()
}

export default authenticate