import { describe, expect, test } from 'vitest';
import { emailSchema, extendedPasswordSchema, nameSchema, otpSchema, passwordSchema } from './shared.schema.js';

describe('nameSchema', () => {
	test('rejects a name that is less than 3 characters', () => {
		const result = nameSchema.safeParse('aa');
		expect(result.success).toBe(false);
	});

	test('accepts a name that is exactly at the minimum threshold (3 characters)', () => {
		const result = nameSchema.safeParse('aaa');
		expect(result.success).toBe(true);
	});

	test('accepts a name that is exactly at the maximum threshold (20 characters)', () => {
		const result = nameSchema.safeParse('a'.repeat(20));
		expect(result.success).toBe(true);
	});

	test('rejects a name that is more than 20 characters', () => {
		const result = nameSchema.safeParse('a'.repeat(21));
		expect(result.success).toBe(false);
	});

	test('trims surrounding whitespaces', () => {
		const result = nameSchema.safeParse(' john ');
		expect(result.data).toBe('john');
	});

	test('rejects a name that falls below the minimum threshold once trimmed', () => {
		const result = nameSchema.safeParse('  aa  ');
		expect(result.success).toBe(false);
	});

	test('rejects a value that is not a string', () => {
		const result = nameSchema.safeParse(99);
		expect(result.success).toBe(false);
	});
});

describe('emailSchema', () => {
	test('accepts a valid email address', () => {
		const result = emailSchema.safeParse('john@example.com');
		expect(result.data).toBe('john@example.com');
	});

	test('converts to lowercase', () => {
		const result = emailSchema.safeParse('JOHN@EXAMPLE.COM');
		expect(result.data).toBe('john@example.com');
	});

	test('trims surrounding whitespaces', () => {
		const result = emailSchema.safeParse(' john@example.com ');
		expect(result.data).toBe('john@example.com');
	});

	test('rejects a string that isn’t an email', () => {
		const result = emailSchema.safeParse('plainaddress');
		expect(result.success).toBe(false);
	});

	test('accepts an email that is exactly at the maximum threshold (254 characters)', () => {
		const result = emailSchema.safeParse('a'.repeat(242) + '@example.com');
		expect(result.success).toBe(true);
	});

	test('rejects an email which is more than 254 characters', () => {
		const result = emailSchema.safeParse('a'.repeat(243) + '@example.com');
		expect(result.success).toBe(false);
	});

	test('rejects a value that is not a string', () => {
		const result = emailSchema.safeParse(99);
		expect(result.success).toBe(false);
	});
});

describe('passwordSchema', () => {
	test('rejects an empty password', () => {
		const result = passwordSchema.safeParse('');
		expect(result.success).toBe(false);
	});

	test('accepts a password that is exactly at the minimum threshold (1 character)', () => {
		const result = passwordSchema.safeParse('a');
		expect(result.success).toBe(true);
	});

	test('accepts a password that is exactly at the maximum threshold (64 characters)', () => {
		const result = passwordSchema.safeParse('a'.repeat(64));
		expect(result.success).toBe(true);
	});

	test('rejects a password that is more than 64 characters', () => {
		const result = passwordSchema.safeParse('a'.repeat(65));
		expect(result.success).toBe(false);
	});

	test('keeps surrounding whitespace untouched', () => {
		const result = passwordSchema.safeParse('  pass  ');
		expect(result.data).toBe('  pass  ');
	});

	test('rejects a value that is not a string', () => {
		const result = passwordSchema.safeParse(99);
		expect(result.success).toBe(false);
	});
});

describe('extendedPasswordSchema', () => {
	test('rejects a password that is less than 15 characters', () => {
		const result = extendedPasswordSchema.safeParse('a'.repeat(14));
		expect(result.success).toBe(false);
	});

	test('accepts a password that is exactly at the minimum threshold (15 characters)', () => {
		const result = extendedPasswordSchema.safeParse('a'.repeat(15));
		expect(result.success).toBe(true);
	});

	test('accepts a password that is exactly at the maximum threshold (64 characters)', () => {
		const result = extendedPasswordSchema.safeParse('a'.repeat(64));
		expect(result.success).toBe(true);
	});

	test('rejects a password with more than 64 characters', () => {
		const result = extendedPasswordSchema.safeParse('a'.repeat(65));
		expect(result.success).toBe(false);
	});

	test('accepts a passphrase with spaces', () => {
		const result = extendedPasswordSchema.safeParse('correct horse battery staple');
		expect(result.success).toBe(true);
	});

	test('accepts a password with no lowercase letters', () => {
		const result = extendedPasswordSchema.safeParse('1'.repeat(15));
		expect(result.success).toBe(true);
	});

	test('accepts characters at the edges of the allowed range (~ and space)', () => {
		const result = extendedPasswordSchema.safeParse('~' + '$'.repeat(13) + ' ');
		expect(result.success).toBe(true);
	});

	test('rejects a non-ASCII character', () => {
		const result = extendedPasswordSchema.safeParse('a'.repeat(14) + 'é');
		expect(result.success).toBe(false);
	});

	test('rejects a control character', () => {
		const result = extendedPasswordSchema.safeParse('a'.repeat(14) + '\n');
		expect(result.success).toBe(false);
	});
});

describe('otpSchema', () => {
	test('rejects an otp that is less than 6 characters', () => {
		const result = otpSchema.safeParse('1'.repeat(5));
		expect(result.success).toBe(false);
	});

	test('accepts an otp that is exactly 6 characters', () => {
		const result = otpSchema.safeParse('123456');
		expect(result.success).toBe(true);
	});

	test('rejects an otp that is more than 6 characters', () => {
		const result = otpSchema.safeParse('1'.repeat(7));
		expect(result.success).toBe(false);
	});

	test('rejects a value that is not a string', () => {
		const result = otpSchema.safeParse(123456);
		expect(result.success).toBe(false);
	});

	test('rejects an otp that contains a non-digit character', () => {
		const result = otpSchema.safeParse('12345a');
		expect(result.success).toBe(false);
	});
});
