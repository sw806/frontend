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
import AddConstraint from './TimeConstraintElements';
import uuid from 'react-native-uuid';
import { TimeInterval } from '../datatypes/datatypes';

const styles = StyleSheet.create({
	ModuleView:{
		paddingTop: 10,
	},
	TimeConstraintButton:{
		color: 'white',
		backgroundColor: '#009FFF',
		height: 40,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	TimeConstraintText: {
		color: 'white',
		fontSize: 18,
		paddingLeft: 10,
	},
	TimeConstraintTextSymbol: { 
		color: 'white',
		fontSize: 30,
		paddingRight: 10,
	  },
	ModalHeader: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	ModalHeaderText:{
		color: '#009FFF',
		fontSize: 26,
		fontWeight: 'bold',
	},
	backButton: {
		width: 40,
		height: 40,
		backgroundColor: 'white',
	},
	addButton: {
		width: 80,
		flexDirection: 'row',
		alignItems: 'center',
	},
	addButtonSymbol: {
		backgroundColor: 'white',
	},
	addButtonText: {
		color: 'black',
		paddingLeft: 10,
		fontSize: 14,
	},
	constraintHeading: {
		paddingTop: 20,
		paddingLeft: 10,
		fontSize: 20,
		color: '#009FFF',
	},
	scrollView: {
		height: 200,
		borderWidth: 2,
		borderColor: 'grey',
	},
});

type TimePickerProps = {
	startConstraints: TimeInterval[];
	setStartConstraints: React.Dispatch<React.SetStateAction<TimeInterval[]>>;
	endConstraints: TimeInterval[];
	setEndConstraints: React.Dispatch<React.SetStateAction<TimeInterval[]>>;
};

const TimePicker: React.FC<TimePickerProps> = ({
	startConstraints,
	setStartConstraints,
	endConstraints,
	setEndConstraints,
}) => {
	const [showSlidingWindow, setShowSlidingWindow] = useState(false);

	const handleOpenSlideWindow = () => {
		setShowSlidingWindow(true);
	};

	const handleCloseSlideWindow = () => {
		setShowSlidingWindow(false);
	};

	const handleDeleteStartConstraint = (id: string) => {
		setStartConstraints((prevStartConstraints) =>
			prevStartConstraints.filter((constraint) => constraint.id !== id)
		);
	};

	const handleDeleteEndConstraint = (id: string) => {
		setEndConstraints((prevEndConstraints) =>
			prevEndConstraints.filter((constraint) => constraint.id !== id)
		);
	};

	const handleAddStartConstraint = () => {
		const newStartConstraint: TimeInterval = {
			id: uuid.v4().toString(),
			startTime: null,
			endTime: null,
		};
		setStartConstraints([...startConstraints, newStartConstraint]);
	};

	const handleAddEndConstraint = () => {
		const newEndConstraint: TimeInterval = {
			id: uuid.v4().toString(),
			startTime: null,
			endTime: null,
		};
		setEndConstraints([...endConstraints, newEndConstraint]);
	};

	const handleTimeIntervalChange = (
		id: string,
		updatedTimeInterval: TimeInterval
	  ) => {
		const updateConstraints = (constraints: TimeInterval[]) =>
		  constraints.map((constraint) =>
			constraint.id === id ? updatedTimeInterval : constraint
		  );
	  
		setStartConstraints((prevStartConstraints) =>
		  updateConstraints(prevStartConstraints)
		);
	  
		setEndConstraints((prevEndConstraints) =>
		  updateConstraints(prevEndConstraints)
		);
	  };

	return (
		<View>
			<View style={styles.ModuleView}>
				<TouchableOpacity style={styles.TimeConstraintButton} onPress={handleOpenSlideWindow}>
					<Text style={styles.TimeConstraintText}>Time Constraints</Text>
					<Text style={styles.TimeConstraintTextSymbol}> {'>'} </Text>
				</TouchableOpacity>
			</View>
			<Modal visible={showSlidingWindow} animationType="slide">
				
				<View style={styles.ModalHeader}>
					<TouchableOpacity onPress={handleCloseSlideWindow}>
						<Avatar.Icon
							style={styles.backButton}
							size={60}
							icon="arrow-left"
						/>
					</TouchableOpacity>

					<Text style={styles.ModalHeaderText}> Time Constraints </Text>
				</View>

				<View>

					<Text style={styles.constraintHeading}>
						Start constraints
					</Text>
					<TouchableOpacity
						style={styles.addButton}
						onPress={handleAddStartConstraint}
					>
						<Text style={styles.addButtonText}> Add</Text>
						<Avatar.Icon
							style={styles.addButtonSymbol}
							icon="plus-thick"
							color='#009FFF'
							size={30}
						/>
					</TouchableOpacity>

					<ScrollView style={styles.scrollView}>
						{startConstraints.map((constraint) => (
							<View key={constraint.id}>
								<AddConstraint
									timeInterval={constraint}
									onDelete={handleDeleteStartConstraint}
									onTimeIntervalChange={handleTimeIntervalChange}
								/>
							</View>
						))}
					</ScrollView>

					<Text style={styles.constraintHeading}>
						End constraints
					</Text>

					<TouchableOpacity
						style={styles.addButton}
						onPress={handleAddEndConstraint}
					>
						<Text style={styles.addButtonText}> Add</Text>
						<Avatar.Icon
							style={styles.addButtonSymbol}
							icon="plus-thick"
							color='#009FFF'
							size={30}
						/>
					</TouchableOpacity>

					<ScrollView style={styles.scrollView}>
						{endConstraints.map((constraint) => (
							<View key={constraint.id}>
								<AddConstraint
									timeInterval={constraint}
									onDelete={handleDeleteEndConstraint}
									onTimeIntervalChange={handleTimeIntervalChange}
								/>
							</View>
						))}
					</ScrollView>
				</View>
			</Modal>
		</View>
	);
};

export default TimePicker;
