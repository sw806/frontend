import { Avatar, Text } from 'react-native-paper';
import {
	Modal,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AddConstraint from './TimeConstraintElements';
import uuid from 'react-native-uuid';
import { Interval } from '../datatypes/datatypes';

const styles = StyleSheet.create({
	ModuleView: {
		paddingTop: 10,
	},
	TimeConstraintButton: {
		color: 'white',
		backgroundColor: '#009FFF',
		height: 40,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
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
		alignItems: 'center',
	},
	ModalHeaderText: {
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


type TimeConstraintModuleProps = {
	startInterval: { start_interval: Interval }[];
	setStartInterval: React.Dispatch<React.SetStateAction<{start_interval: Interval}[]>>;
	endInterval: {end_interval: Interval}[];
	setEndInterval: React.Dispatch<React.SetStateAction<{end_interval: Interval}[]>>;
  };

const TimeConstraintModule: React.FC<TimeConstraintModuleProps> = ({
	startInterval,
	setStartInterval,
	endInterval,
	setEndInterval,
	}) => {
	const [showSlidingWindow, setShowSlidingWindow] = useState(false);

	useEffect(() => {
		//Runs on the first render
		//And any time any dependency value changes
	}, [startInterval, endInterval]);

	const handleOpenSlideWindow = () => {
		setShowSlidingWindow(true);
	};

	const handleCloseSlideWindow = () => {
		setShowSlidingWindow(false);
		console.log(startInterval)
		console.log(endInterval)
	};

	const handleDeleteStartInterval = (id: string) => {
		setStartInterval((prevStartIntervals) =>
		  prevStartIntervals.filter(
			(intervalObject) => intervalObject.start_interval.id !== id
		  )
		);
	  };
	  
	  const handleDeleteEndInterval = (id: string) => {
		setEndInterval((prevEndIntervals) =>
		  prevEndIntervals.filter(
			(intervalObject) => intervalObject.end_interval.id !== id
		  )
		);
	  };

	const handleAddStartInterval = () => {

		const now = new Date();
		const nextDay = new Date(now);
		nextDay.setDate(now.getDate() + 1);
		nextDay.setHours(15, 0, 0, 0);

		const newStartInterval: Interval = {
			id: uuid.v4().toString(),
			start: Math.floor(now.getTime() / 1000),
			end: Math.floor(nextDay.getTime() / 1000),
			duration: null,
		};
		setStartInterval([...startInterval, { start_interval: newStartInterval }]);
	};

	const handleAddEndInterval = () => {
		const newEndInterval: Interval = {
			id: uuid.v4().toString(),
			start: null,
			end: null,
			duration: null
		};
		setEndInterval([...endInterval, { end_interval: newEndInterval}]);
	};

	const updateStartInterval = (updatedInterval: Interval) => {
		setStartInterval((prevStartIntervals) =>
		  prevStartIntervals.map((interval) =>
			interval.start_interval.id === updatedInterval.id
			  ? { start_interval: updatedInterval }
			  : interval
		  )
		);
	  };
	  
	  const updateEndInterval = (updatedInterval: Interval) => {
		setEndInterval((prevEndIntervals) =>
		  prevEndIntervals.map((interval) =>
			interval.end_interval.id === updatedInterval.id
			  ? { end_interval: updatedInterval }
			  : interval
		  )
		);
	  };

	return (
		<View>
			<View style={styles.ModuleView}>
				<TouchableOpacity
					style={styles.TimeConstraintButton}
					onPress={handleOpenSlideWindow}
				>
					<Text style={styles.TimeConstraintText}>
						Time Constraints
					</Text>
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

					<Text style={styles.ModalHeaderText}>
						{' '}
						Time Constraints{' '}
					</Text>
				</View>

				<View>
					<Text style={styles.constraintHeading}>
						Start constraints
					</Text>
					<TouchableOpacity
						style={styles.addButton}
						onPress={handleAddStartInterval}
					>
						<Text style={styles.addButtonText}> Add</Text>
						<Avatar.Icon
							style={styles.addButtonSymbol}
							icon="plus-thick"
							color="#009FFF"
							size={30}
						/>
					</TouchableOpacity>

					<ScrollView style={styles.scrollView}>
						{startInterval.map((intervalObject) => (
						<View key={intervalObject.start_interval.id}>
							<AddConstraint
								interval={intervalObject.start_interval}
								onDelete={handleDeleteStartInterval}
								onUpdate={updateStartInterval}
							/>
							</View>
						))}
					</ScrollView>


					<Text style={styles.constraintHeading}>
						End constraints
					</Text>

					<TouchableOpacity
						style={styles.addButton}
						onPress={handleAddEndInterval}
					>
						<Text style={styles.addButtonText}> Add</Text>
						<Avatar.Icon
							style={styles.addButtonSymbol}
							icon="plus-thick"
							color="#009FFF"
							size={30}
						/>
					</TouchableOpacity>

					<ScrollView style={styles.scrollView}>
						{endInterval.map((intervalObject) => (
							<View key={intervalObject.end_interval.id}>
							<AddConstraint
								interval={intervalObject.end_interval}
								onDelete={handleDeleteEndInterval}
								onUpdate={updateEndInterval}
							/>
							</View>
						))}
					</ScrollView>
				</View>
			</Modal>
		</View>
	);
};

export default TimeConstraintModule;
