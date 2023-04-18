import { Text } from 'react-native-paper';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Interval } from '../datatypes/datatypes';
import RNDateTimePicker from '@react-native-community/datetimepicker';

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
	timepickerbackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	timepickerView: {

	}
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
	const constraint = new Date();
	constraint.setHours(15, 0, 0, 0);

	const timeOptions = {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		weekday: 'short',
	};

	const isSameDay = (d1: Date, d2: Date) => {
		return (
		  d1.getFullYear() === d2.getFullYear() &&
		  d1.getMonth() === d2.getMonth() &&
		  d1.getDate() === d2.getDate()
		);
	  };
	  
	  const handleDateTimePickerChange = (
		name: 'startTime' | 'endTime',
		selectedDate: Date | undefined
	  ) => {
		const selectedDateUnix = Math.floor(selectedDate.getTime() / 1000);
		const updatedTimeInterval = { ...timeIntervalState };
		const datetimeNow = new Date();
		const datetimeToday = new Date();
		datetimeToday.setHours(23, 59, 0, 0);
		const datetimeTomorrow = new Date(datetimeNow);
		datetimeTomorrow.setDate(datetimeTomorrow.getDate() + 1);
		datetimeTomorrow.setHours(23, 59, 0, 0);
	  
		if (name === 'startTime') {
		  if (datetimeNow.getTime() > selectedDate.getTime()) {
			alert('Please select a time after the current time.');
			return;
		  }
	  
		  if (selectedDateUnix > updatedTimeInterval.end) {
			alert('Please select a time before the To constraint');
			return;
		  }
		  updatedTimeInterval.start = selectedDateUnix;
		} else {
		  // end time
		  if (selectedDateUnix < updatedTimeInterval.start) {
			alert('Please select a time after the From constraint');
			return;
		  }
	  
		  // Check if the current time is after 15:00, selected must not exceed tomorrow
		  if (datetimeNow.getHours() >= 15 && !isSameDay(selectedDate, datetimeNow) && !isSameDay(selectedDate, datetimeTomorrow)) {
			alert('Please select a time within the limit of tomorrow');
			return;
		  }
	  
		  // Check if the current time is before 15:00, selected must be today
		  if (datetimeNow.getHours() < 15 && !isSameDay(selectedDate, datetimeNow)) {
			alert('Please select a time within the limit of today');
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
	
		  <Modal
			transparent={true}
			visible={showPicker}
			onRequestClose={() => {
			  setShowPicker(false);
			}}
		  >
			<TouchableOpacity style={styles.timepickerbackground}
				onPress={() => {
					setShowPicker(false);
					}}
			>
			  <View
				style={{
				  backgroundColor: 'white',
				  borderRadius: 10,
				  padding: 20,
				}}
			  >
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
				  mode="datetime"
				  textColor="grey"
				  is24Hour={true}
				  display="spinner"
				  onChange={(event, selectedDate) => {
					setShowPicker(false);
					if (selectedDate) {
					  handleDateTimePickerChange(pickerType, selectedDate);
					}
				  }}
				/>
			  </View>
			</TouchableOpacity>
		  </Modal>
	
		  <TouchableOpacity onPress={() => onDelete(timeIntervalState.id)}>
			<Text style={styles.itemDelete}>Delete</Text>
		  </TouchableOpacity>
		</View>
	  );
	};
	
	export default AddConstraint;