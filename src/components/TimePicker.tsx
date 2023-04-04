import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ActivityIndicator, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  nameInputField: {
    height: 50,
    width: 100,
    marginBottom: 10,
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
  itemContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  }
});

type itemProps = {
  timeinterval: TimeInterval;
}

type TimeInterval = {
  startTime?: Number,
  endTime?: Number,
  interval?: Number
}

type TimeIntervals = {
  intervals: TimeInterval[]
}

const TimePicker = () => {
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [timeInterval, setTimeInterval] = useState<TimeInterval>({ startTime: null, endTime: null, interval: null});
  const [allIntervals, setAllIntervals] = useState<TimeIntervals>();
  const [showSlidingWindow, setShowSlidingWindow] = useState(false);

  const showTimepicker = (name: string) => {
    showMode(name, 'time');
  };

  const showMode = (name: string, currentMode) => {
    if (name === 'startTime') {
      DateTimePickerAndroid.open({
        value: selectedStartTime,
        onChange: (event, selectedDate) => {
          const startTime = setDateTime(selectedDate, setSelectedStartTime);
          setTimeInterval({ ...timeInterval, startTime });
        },
        mode: currentMode,
        is24Hour: true,
      });
    } else if (name === 'endTime') {
      DateTimePickerAndroid.open({
        value: selectedEndTime,
        onChange: (event, selectedDate) => {
          const endTime = setDateTime(selectedDate, setSelectedEndTime);
          setTimeInterval({ ...timeInterval, endTime });
        },
        mode: currentMode,
        is24Hour: true,
      });
    } else {
      throw new Error('Time interval could not be set for ' + name);
    }
  };

  const setDateTime = (selectedDate, setSelectedDate) => {
    const currentDate = selectedDate || new Date();
    const unixTime = Math.floor(currentDate.getTime() / 1000);
    setSelectedDate(currentDate);
    return unixTime;
  };

  const handleOpenSlideWindow = () => {
		setShowSlidingWindow(true);
	};

	const handleCloseSlideWindow = () => {
		setShowSlidingWindow(false);
	};

  return (
    <View>

      <View>
      <TouchableOpacity
        onPress={handleOpenSlideWindow}
      >
          <Text>
            Click here
          </Text>
      </TouchableOpacity>
      </View>

      <Modal visible={showSlidingWindow} animationType="slide">

        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => showTimepicker('startTime')}
            style={styles.nameInputField}
          >
            <Text style={styles.nameInputFieldText}>
              Start time
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showTimepicker('endTime')}
            style={styles.nameInputField}
          >
            <Text style={styles.nameInputFieldText}>
              End time
            </Text>
          </TouchableOpacity>
        </View>

        <Text>Start time: {selectedStartTime.toLocaleString()}</Text>
        <Text>final start time: {selectedEndTime.toLocaleString()}</Text>


        <TouchableOpacity
          onPress={handleCloseSlideWindow}
        >
            <Text>
              Click here
            </Text>
        </TouchableOpacity>

        
      </Modal>

    </View>
  );
};

export default TimePicker;
