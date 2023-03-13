import { Button, Text } from 'react-native-paper';
import * as React from 'react';
import { View } from 'react-native';
import { components, colors } from '../styles/theme';

type TIProps = {
	name: string;
	duration: string;
	energy: string;
	power: string;
	startDate: number;
	setStartDate;
	setError;
};

const FindStartDateButton = ({
	name,
	duration,
	energy,
	power,
	setStartDate,
	setError,
}: TIProps) => {
	const findStartDate = async () => {
		if (!name) {
			alert('Please enter a task name.');
			return;
		}

		if (!duration || !power || !energy) {
			alert('Duration, Power and Energy needs to be set');
			return;
		}

		const inputs = [duration, energy, power];
		const filledInputs = inputs.filter((input) => !!input);

		if (
			inputs.some((input) => input === '' || input === undefined) ||
			filledInputs.length < 2
		) {
			alert('Provide 2 of the following inputs: Duration, Power, Energy');
			return;
		}

		if (parseFloat(power) > 3) {
			alert('Power is too high');
			return;
		}

		fetch(process.env.SERVER_IP + '/api/v1/schedules', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				duration: parseFloat(duration),
				power: power,
			}),
		})
			.then((response) => response.json())
			.then((responseData) => {
				setStartDate(responseData.start_date);
			})
			.catch(() => {
				setError(true);
			});
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
