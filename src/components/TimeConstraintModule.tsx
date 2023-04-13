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
	startConstraints: Interval[];
	setStartConstraints: React.Dispatch<
		React.SetStateAction<[{ start_interval: Interval }]>
	>;
	endConstraints: [{ end_interval: Interval }];
	setEndConstraints: React.Dispatch<
		React.SetStateAction<[{ end_interval: Interval }]>
	>;
};

const TimeConstraintModule: React.FC<TimeConstraintModuleProps> = ({
	startConstraints,
	setStartConstraints,
	endConstraints,
	setEndConstraints,
}) => {
	const [showSlidingWindow, setShowSlidingWindow] = useState(false);

	useEffect(() => {
		//Runs on the first render
		//And any time any dependency value changes
	}, [startConstraints, endConstraints]);

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
		const newStartConstraint: Interval = {
			id: uuid.v4().toString(),
			start: null,
			duration: null,
		};
		setStartConstraints([...startConstraints, newStartConstraint]);
	};

	const handleAddEndConstraint = () => {
		const newEndConstraint: Interval = {
			id: uuid.v4().toString(),
			start: null,
			duration: null,
		};
		setEndConstraints([...endConstraints, newEndConstraint]);
	};

	const updateStartConstraint = (updatedConstraint: Interval) => {
		setStartConstraints((prevStartConstraints) =>
			prevStartConstraints.map((constraint) =>
				constraint.id === updatedConstraint.id
					? updatedConstraint
					: constraint
			)
		);
	};

	const updateEndConstraint = (updatedConstraint: Interval) => {
		setEndConstraints((prevEndConstraints) =>
			prevEndConstraints.map((constraint) =>
				constraint.id === updatedConstraint.id
					? updatedConstraint
					: constraint
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
						onPress={handleAddStartConstraint}
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
						{startConstraints.map((constraint) => (
							<View key={constraint.id}>
								<AddConstraint
									TimeConstraint={constraint}
									onDelete={handleDeleteStartConstraint}
									onUpdate={updateStartConstraint}
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
							color="#009FFF"
							size={30}
						/>
					</TouchableOpacity>

					<ScrollView style={styles.scrollView}>
						{endConstraints.map((constraint) => (
							<View key={constraint.id}>
								<AddConstraint
									TimeConstraint={constraint}
									onDelete={handleDeleteEndConstraint}
									onUpdate={updateEndConstraint}
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
