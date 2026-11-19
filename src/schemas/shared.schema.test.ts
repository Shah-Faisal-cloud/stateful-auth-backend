import { describe, expect, test } from 'vitest';
import { nameSchema } from './shared.schema.js';

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
