import { describe, expect, test } from 'vitest';
import { changePasswordSchema, deleteAccountSchema, updateProfileSchema } from './user.schema.js';

describe('deleteAccountSchema', () => {
	// proves deleteAccount uses passwordSchema, not extendedPasswordSchema
	test('accepts a one-character password', () => {
		const result = deleteAccountSchema.safeParse({
			password: 'a',
		});
		expect(result.success).toBe(true);
	});
});

describe('changePasswordSchema', () => {
	test('accepts a 1-character password for the old password', () => {
		const result = changePasswordSchema.safeParse({
			oldPassword: 'a',
			newPassword: 'a'.repeat(15),
		});
		expect(result.success).toBe(true);
	});

	test('rejects a password that is less than 15-characters for the new password', () => {
		const result = changePasswordSchema.safeParse({
			oldPassword: 'a',
			newPassword: 'a'.repeat(14),
		});
		expect(result.success).toBe(false);
	});
});

describe('updateProfileSchema', () => {
	const nonEditableFields = [
		{ field: 'email', body: { email: 'john@example.com' } },
		{ field: 'password', body: { password: 'a'.repeat(15) } },
		{ field: 'isVerified', body: { isVerified: true } },
	];

	test('rejects an empty object', () => {
		const result = updateProfileSchema.safeParse({});
		expect(result.success).toBe(false);
	});

	test.each(nonEditableFields)('rejects a body that only contains the non-editable field $field', ({ body }) => {
		const result = updateProfileSchema.safeParse(body);
		expect(result.success).toBe(false);
	});

	test('drops non-editable fields sent together with a valid name', () => {
		const result = updateProfileSchema.safeParse({
			name: 'John Doe',
			...Object.assign({}, ...nonEditableFields.map(({ body }) => body)),
		});
		expect(result.success).toBe(true);
		expect(result.data).toStrictEqual({
			name: 'John Doe',
		});
	});
});
