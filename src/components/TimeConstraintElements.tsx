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

  type AddConstraintProps = {
	timeInterval: TimeInterval;
	onDelete: (id: string) => void;
	onTimeIntervalChange: (id: string, updatedTimeInterval: TimeInterval) => void;
  };
  
  const AddConstraint = ({ timeInterval, onDelete, onTimeIntervalChange }: AddConstraintProps) => {
	const [showPicker, setShowPicker] = useState(false);
	const [pickerType, setPickerType] = useState<'startTime' | 'endTime'>('startTime');
	const [timeIntervalState, setTimeIntervalState] = useState(timeInterval);	
  
	const handleDateTimePickerChange = (
	  name: 'startTime' | 'endTime',
	  selectedDate: Date | undefined
	) => {
	  const unixTime = selectedDate ? Math.floor(selectedDate.getTime() / 1000) : null;
	  const updatedTimeInterval = { ...timeIntervalState };
	  if (name === 'startTime') {
		updatedTimeInterval.startTime = unixTime;
	  } else {
		updatedTimeInterval.endTime = unixTime;
	  }
	  setTimeIntervalState(updatedTimeInterval);
	  onTimeIntervalChange(timeInterval.id, updatedTimeInterval);
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
			{timeIntervalState.startTime
			  ? new Date(timeIntervalState.startTime * 1000).toLocaleTimeString(undefined, timeOptions)
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
			{timeIntervalState.endTime
			  ? new Date(timeIntervalState.endTime * 1000).toLocaleTimeString(undefined, timeOptions)
			  : 'Not set'}
		  </Text>
		</TouchableOpacity>
  
		{showPicker && (
  <DateTimePicker
    value={
      pickerType === 'startTime'
        ? timeIntervalState.startTime
          ? new Date(timeIntervalState.startTime * 1000)
          : new Date()
        : timeIntervalState.endTime
        ? new Date(timeIntervalState.endTime * 1000)
        : new Date()
    }
    mode="time"
    is24Hour={true}
    display="default"
    onChange={(event, selectedDate) => {
      setShowPicker(false);
      if (selectedDate) {
        handleDateTimePickerChange(pickerType, selectedDate);
      }
    }}
  />
)}
  
		<TouchableOpacity onPress={() => onDelete(timeInterval.id)}>
		  <Text style={styles.itemDelete}>Delete</Text>
		</TouchableOpacity>
	  </View>
	);
  };
  
export default AddConstraint;
