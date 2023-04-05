import { Button, Text } from 'react-native-paper';
import * as React from 'react';
import { View } from 'react-native';
import { components, colors } from '../styles/theme';
import {
	ScheduleRequestParams,
	ScheduleResponse,
	postSchedule,
} from '../api/scheduleApi';

type TIProps = {
	name: string;
	duration: string;
	energy: string;
	power: string;
	startDate: number;
	setStartDate;
	setLoading;
	setError;
};

const FindStartDateButton = ({
	name,
	duration,
	energy,
	power,
	setStartDate,
	setLoading,
	setError,
}: TIProps) => {
	const findStartDate = async () => {
		if (!name) {
			alert('Please enter a task name.');
			return false;
		}

		if (!duration || !power || !energy) {
			alert('Duration, Power and Energy has to be set');
			return false;
		}

		const inputs = [duration, energy, power];
		const filledInputs = inputs.filter((input) => !!input);

		if (
			inputs.some((input) => input === '' || input === undefined) ||
			filledInputs.length < 2
		) {
			alert('Provide 2 of the following inputs: Duration, Power, Energy');
			return false;
		}

		const params: ScheduleRequestParams = {
			duration: parseFloat(duration),
			power: parseFloat(power),
		};

		try {
			setLoading(true);
			const responseData: ScheduleResponse = await postSchedule(params);
			setStartDate(responseData.start_date);
			setLoading(false);
			return true;
		} catch (error) {
			setLoading(false);
			setError(true);
			return false;
		}
	};
	return (
		<View>
			<Button
				mode="contained"
				style={{
					alignSelf: 'center',
					...components.buttons.primary.contained,
				}}
				buttonColor={colors.blue.regular}
				onPress={() => {
					findStartDate();
				}}
			>
				Find start time
			</Button>
		</View>
	);
};

export default FindStartDateButton;
