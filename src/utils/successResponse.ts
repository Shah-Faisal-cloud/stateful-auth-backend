export interface SuccessResponse {
	success: true;
	data?: object;
	message?: string;
}

function successResponse(message?: string, data?: object): SuccessResponse {
	const response: SuccessResponse = {
		success: true,
	};

	if (data !== undefined) {
		response.data = data;
	}

	if (message !== undefined) {
		response.message = message;
	}

	return response;
}

export default successResponse;
