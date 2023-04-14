export interface ScheduleRequestParams {
	duration: number;
	power: number;
}

export interface ScheduleResponse {
	start_date: number;
}

export const postSchedule = async (
	params: ScheduleRequestParams
): Promise<ScheduleResponse> => {
	const response = await fetch(process.env.SERVER_IP + '/api/v1/schedules', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	});

	if (!response.ok) {
		throw new Error('Error fetching data');
	}

	const responseData: ScheduleResponse = await response.json();

	try {
		if (responseData.start_date) {
			return responseData;
		}
	} catch (error) {
		console.log(error);
		throw new Error('Error in response object');
	}
	throw new Error('Unknown Error');
};
