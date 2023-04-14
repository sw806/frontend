import { Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Interval } from '../datatypes/datatypes';

const styles = StyleSheet.create({
	itemContainer: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	nameInputField: {
		height: 30,
		width: 150,
		backgroundColor: 'white',
		borderColor: '#009FFF',
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius: 5,
	},
	nameInputFieldText: {
		color: 'black',
		paddingLeft: 10,
		fontSize: 16,
	},
	itemDelete: {
		color: 'red',
	},
});

type AddConstraintProps = {
	interval: Interval;
	onDelete: (id: string) => void;
	onUpdate: (updatedConstraint: Interval) => void;
};

const AddConstraint = ({
	interval,
	onDelete,
	onUpdate,
}: AddConstraintProps) => {
	const [showPicker, setShowPicker] = useState(false);
	const [pickerType, setPickerType] = useState<'startTime' | 'endTime'>(
		'startTime'
	);
	const [timeIntervalState, setTimeIntervalState] = useState(interval);

	const timeOptions = {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		weekday: 'short',
	};

	const handleDateTimePickerChange = (
		name: 'startTime' | 'endTime',
		selectedDate: Date | undefined
	) => {
		const selectedDateUnix = Math.floor(selectedDate.getTime() / 1000);
		const updatedTimeInterval = { ...timeIntervalState };
		const dateNow = new Date().getTime() / 1000;

		if (name === 'startTime') {
			if (dateNow > selectedDateUnix) {
				alert('Please select a time after the current time.');
				return;
			}
			updatedTimeInterval.start = selectedDateUnix;
		} else {
			if (selectedDateUnix < updatedTimeInterval.start) {
				alert('Please select a time after the From constriant');
				return;
			}
			updatedTimeInterval.end = selectedDateUnix;
		}
		setTimeIntervalState(updatedTimeInterval);
		onUpdate(updatedTimeInterval);
	};

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity
				style={styles.nameInputField}
				onPress={() => {
					setPickerType('startTime');
					setShowPicker(true);
				}}
			>
				<Text style={styles.nameInputFieldText}>
					From:{' '}
					{new Date(
						timeIntervalState.start * 1000
					).toLocaleTimeString(undefined, timeOptions)}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.nameInputField}
				onPress={() => {
					setPickerType('endTime');
					setShowPicker(true);
				}}
			>
				<Text style={styles.nameInputFieldText}>
					To:{' '}
					{new Date(timeIntervalState.end * 1000).toLocaleTimeString(
						undefined,
						timeOptions
					)}
				</Text>
			</TouchableOpacity>

			{showPicker && (
				<DateTimePicker
					value={
						pickerType === 'startTime'
							? timeIntervalState.start
								? new Date(timeIntervalState.start * 1000)
								: new Date()
							: timeIntervalState.end
							? new Date(timeIntervalState.end * 1000)
							: new Date()
					}
					mode="time"
					is24Hour={true}
					display="default"
					onChange={(event, selectedDate) => {
						setShowPicker(false);
						if (selectedDate) {
							handleDateTimePickerChange(
								pickerType,
								selectedDate
							);
						}
					}}
				/>
			)}

			<TouchableOpacity onPress={() => onDelete(timeIntervalState.id)}>
				<Text style={styles.itemDelete}>Delete</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddConstraint;
