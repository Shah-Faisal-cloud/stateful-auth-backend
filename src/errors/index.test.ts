import { describe, expect, test } from 'vitest';
import {
	AppError,
	BadRequestError,
	ConflictError,
	InvalidCredentialsError,
	NotAuthenticatedError,
	NotFoundError,
	NotVerifiedError,
} from './index.js';

describe('custom error classes', () => {
	const errorMessage = 'error message for testing';
	const errorCases = [
		{
			Class: BadRequestError,
			name: 'BadRequestError',
			statusCode: 400,
			code: 'BAD_REQUEST',
		},
		{
			Class: ConflictError,
			name: 'ConflictError',
			statusCode: 409,
			code: 'CONFLICT',
		},
		{
			Class: InvalidCredentialsError,
			name: 'InvalidCredentialsError',
			statusCode: 401,
			code: 'INVALID_CREDENTIALS',
		},
		{
			Class: NotAuthenticatedError,
			name: 'NotAuthenticatedError',
			statusCode: 401,
			code: 'NOT_AUTHENTICATED',
		},
		{
			Class: NotFoundError,
			name: 'NotFoundError',
			statusCode: 404,
			code: 'NOT_FOUND',
		},
		{
			Class: NotVerifiedError,
			name: 'NotVerifiedError',
			statusCode: 403,
			code: 'EMAIL_NOT_VERIFIED',
		},
	];

	test.each(errorCases)(
		'$name has the correct name, http status code, error code and message',
		({ Class, name, statusCode, code }) => {
			const error = new Class(errorMessage);
			expect(error.name).toBe(name);
			expect(error.statusCode).toBe(statusCode);
			expect(error.code).toBe(code);
			expect(error.message).toBe(errorMessage);
		},
	);

	test.each(errorCases)('$name is an instance of AppError', ({ Class }) => {
		const error = new Class(errorMessage);
		expect(error).toBeInstanceOf(AppError);
	});
});
