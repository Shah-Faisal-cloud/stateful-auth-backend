import type { RequestHandler } from 'express';
import type z from 'zod';
import { BadRequestError } from '../errors/index.js';

function validateBody(schema: z.ZodType): RequestHandler {
	return (req, res, next) => {
		const parsedBody = schema.safeParse(req.body);

		if (!parsedBody.success) {
			throw new BadRequestError('Invalid Request Data');
		}

		req.body = parsedBody.data;
		next();
	};
}

export default validateBody;
