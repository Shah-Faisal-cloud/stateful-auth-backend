import { describe, expect, test } from 'vitest';
import { emailSchema, nameSchema, passwordSchema } from './shared.schema.js';

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
