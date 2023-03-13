export interface ScheduleRequestParams {
	duration: number;
	power: string;
}

export interface ScheduleResponse {
	start_date: string;
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

	return responseData;
};
