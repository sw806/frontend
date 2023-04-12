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
		width: 140,
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
	Interval: Interval;
	onDelete: (id: string) => void;
	onUpdate: (updatedConstraint: Interval[]) => void;
};

const AddConstraint = ({ Interval, onDelete, onUpdate }: AddConstraintProps) => {
	const [showPicker, setShowPicker] = useState(false);
	const [pickerType, setPickerType] = useState<'startTime' | 'endTime'>('startTime');
	const [timeConstraintState, setTimeConstraintState] = useState(Interval);

	const handleDateTimePickerChange = (
		name: 'startTime' | 'endTime',
		selectedDate: Date | undefined
	) => {
		const unixTime = selectedDate
			? Math.floor(selectedDate.getTime() / 1000)
			: null;
		const updatedTimeInterval = { ...timeConstraintState };
		if (name === 'startTime') {
			updatedTimeInterval.start = unixTime;
		} else {
			updatedTimeInterval.endTime = unixTime;
		}
		setTimeConstraintState(updatedTimeInterval);
		onUpdate(updatedTimeInterval); // Add this line
	};

	const timeOptions = {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
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
					{timeConstraintState.start ? new Date(
								timeConstraintState.start * 1000
						  ).toLocaleTimeString(undefined, timeOptions)
					: 'Not set'}
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
					{timeConstraintState.endTime
						? new Date(
								timeConstraintState.endTime * 1000
						  ).toLocaleTimeString(undefined, timeOptions)
						: 'Not set'}
				</Text>
			</TouchableOpacity>

			{showPicker && (
				<DateTimePicker
					value={
						pickerType === 'startTime'
							? timeConstraintState.start
								? new Date(timeConstraintState.start * 1000)
								: new Date()
							: timeConstraintState.endTime
							? new Date(timeConstraintState.endTime * 1000)
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

			<TouchableOpacity onPress={() => onDelete(timeConstraintState.id)}>
				<Text style={styles.itemDelete}>Delete</Text>
			</TouchableOpacity>
		</View>
	);
};
  
export default AddConstraint;
