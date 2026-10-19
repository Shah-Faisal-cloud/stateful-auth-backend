import { expect, test } from 'vitest';
import generateOtp from './otp.js';

test('returns a string of exactly 6 digits', () => {
	for (let i = 0; i <= 100; i++) {
		const result = generateOtp();
		expect(result).toMatch(/^\d{6}$/);
	}
});
