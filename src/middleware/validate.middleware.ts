import type { RequestHandler } from "express";
import { BadRequestError } from "../errors/index.js";
import type z from "zod";

function validateBody(schema: z.ZodType): RequestHandler {
  return (req, res, next) => {
    const parsedBody = schema.safeParse(req.body)

    if (!(parsedBody.success)) {
      return next(new BadRequestError('Invalid Request Data'))
    }

    req.body = parsedBody.data
    next()
  }
}

export default validateBody