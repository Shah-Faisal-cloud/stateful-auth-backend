import { describe, expect, test } from 'vitest';
import { loginSchema, resetPasswordSchema, signupSchema } from './auth.schema.js';

describe('signupSchema', () => {
	// proves signup uses extendedPasswordSchema, not passwordSchema
	test('rejects a password that is less than 15 characters', () => {
		const result = signupSchema.safeParse({
			name: 'John Doe',
			email: 'john@example.com',
			password: 'a'.repeat(14),
		});
		expect(result.success).toBe(false);
	});

	test('drops the isVerified field sent by the client', () => {
		const result = signupSchema.safeParse({
			name: 'John Doe',
			email: 'john@example.com',
			password: 'a'.repeat(15),
			isVerified: true,
		});
		expect(result.data).not.toHaveProperty('isVerified');
	});
});

describe('loginSchema', () => {
	// proves login uses passwordSchema, not extendedPasswordSchema
	test('accepts a password that signup would reject (1 character)', () => {
		const result = loginSchema.safeParse({
			name: 'John Doe',
			email: 'john@example.com',
			password: 'a',
		});
		expect(result.success).toBe(true);
	});
});

describe('resetPasswordSchema', () => {
	// proves resetPassword uses extendedPasswordSchema, not passwordSchema
	test('rejects a password that is less than 15 characters', () => {
		const result = resetPasswordSchema.safeParse({
			resetToken: 'token',
			password: 'a'.repeat(14),
		});
		expect(result.success).toBe(false);
	});
});
