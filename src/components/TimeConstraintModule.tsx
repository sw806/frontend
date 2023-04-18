import { Avatar, Text } from 'react-native-paper';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
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
		fontSize: 16,
		paddingLeft: 10,
	},
	TimeConstraintTextSymbol: {
		color: 'white',
		fontSize: 20,
		paddingRight: 10,
	},
	ModalHeader: {
		paddingTop: 40,
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
		paddingTop: 40,
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
	setStartInterval: React.Dispatch<
		React.SetStateAction<{ start_interval: Interval }[]>
	>;
	endInterval: { end_interval: Interval }[];
	setEndInterval: React.Dispatch<
		React.SetStateAction<{ end_interval: Interval }[]>
	>;
};

const TimeConstraintModule: React.FC<TimeConstraintModuleProps> = ({
	startInterval,
	setStartInterval,
	endInterval,
	setEndInterval,
}) => {
	const [showSlidingWindow, setShowSlidingWindow] = useState(false);
	const constraint = new Date();
	constraint.setHours(15, 0, 0, 0);

	const handleOpenSlideWindow = () => {
		setShowSlidingWindow(true);
	};

	const handleCloseSlideWindow = () => {
		setShowSlidingWindow(false);
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
		let start = new Date();
		let end = new Date(start);
		end.setHours(23, 59, 0, 0);

		// if current time is above 15:00 we have next day prognosis
		if (start.getTime() > constraint.getTime()) {
			end.setDate(start.getDate() + 1);
		}
		const newStartInterval: Interval = {
			id: uuid.v4().toString(),
			start: Math.floor(start.getTime() / 1000),
			end: Math.floor(end.getTime() / 1000),
			duration: null,
		};
		setStartInterval([
			...startInterval,
			{ start_interval: newStartInterval },
		]);
	};

	const handleAddEndInterval = () => {
		let start = new Date();
		let end = new Date(start);
		end.setHours(23, 59, 0, 0);

		// if current time is above 15:00 we have next day prognosis
		if (start.getTime() > constraint.getTime()) {
			end.setDate(start.getDate() + 1);
		}
		const newEndInterval: Interval = {
			id: uuid.v4().toString(),
			start: Math.floor(start.getTime() / 1000),
			end: Math.floor(end.getTime() / 1000),
			duration: null,
		};
		setEndInterval([...endInterval, { end_interval: newEndInterval }]);
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
					<Text style={styles.TimeConstraintText}>Constrain</Text>
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

					<Text style={styles.ModalHeaderText}> Constrain </Text>
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
