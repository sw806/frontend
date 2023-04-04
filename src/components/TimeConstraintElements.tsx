import { Avatar, Button, Card, Text } from 'react-native-paper';
import {
	ActivityIndicator,
	Modal,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker, {
	DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { TimeInterval } from '../datatypes/datatypes';

type AddConstraintProps = {
	timeInterval: TimeInterval;
	onDelete: (id: string) => void;
};

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
	itemDelete:{
		color: 'red'
	},
});

const AddConstraint = ({ timeInterval, onDelete }: AddConstraintProps) => {
	const [selectedStartTime, setSelectedStartTime] = useState(new Date());
	const [selectedEndTime, setSelectedEndTime] = useState(new Date());
	const [startSelected, setStartSelected] = useState(false);
	const [endSelected, setEndSelected] = useState(false);

	const showTimepicker = (name: string) => {
		showMode(name, 'time');
	};

	const handleDateTimePickerChange = (
		name: string,
		setSelectedDate,
		selectedDate
	) => {
		const currentDate = selectedDate || new Date();
		const unixTime = Math.floor(currentDate.getTime() / 1000);
		setSelectedDate(currentDate);
		if (name === 'startTime') {
			timeInterval.startTime = unixTime;
			setStartSelected(true);
		} else {
			timeInterval.endTime = unixTime;
			setEndSelected(true);
		}
	};

	const showMode = (name: string, currentMode) => {
		const setSelectedDate =
			name === 'startTime' ? setSelectedStartTime : setSelectedEndTime;

		DateTimePickerAndroid.open({
			value: name === 'startTime' ? selectedStartTime : selectedEndTime,
			onChange: (event, selectedDate) => {
				handleDateTimePickerChange(name, setSelectedDate, selectedDate);
			},
			mode: currentMode,
			is24Hour: true,
		});
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
				onPress={() => showTimepicker('startTime')}
			>
				<Text style={styles.nameInputFieldText}>
					From: {startSelected ? selectedStartTime.toLocaleTimeString(undefined, timeOptions) : 'Not set'}
					
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.nameInputField}
				onPress={() => showTimepicker('endTime')}
			>
				<Text style={styles.nameInputFieldText}>
					To: {endSelected ? selectedEndTime.toLocaleTimeString(undefined, timeOptions) : 'Not set'}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => onDelete(timeInterval.id)}>
				<Text style={styles.itemDelete}>Delete</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddConstraint;
