import { describe, expect, test } from 'vitest';
import successResponse from './successResponse.js';

describe('successResponse', () => {
	test('returns success and message when only a message is provided as an argument', () => {
		const result = successResponse('Logged out successfully');
		expect(result).toStrictEqual({
			success: true,
			message: 'Logged out successfully',
		});
	});

	test('returns success and data when only data is provided as an argument', () => {
		const result = successResponse(undefined, { id: 1, name: 'John Doe' });
		expect(result).toStrictEqual({
			success: true,
			data: { id: 1, name: 'John Doe' },
		});
	});

	test('returns success, message and data when message and data both are provided as arguments', () => {
		const result = successResponse('Logged in successfully', { id: 1, name: 'John Doe' });
		expect(result).toStrictEqual({
			success: true,
			message: 'Logged in successfully',
			data: { id: 1, name: 'John Doe' },
		});
	});

	test('returns success only when nothing is provided as an argument', () => {
		const result = successResponse();
		expect(result).toStrictEqual({
			success: true,
		});
	});
});
