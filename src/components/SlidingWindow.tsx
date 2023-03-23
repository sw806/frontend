import React, { useState } from 'react';
import { colors } from '../../src/styles/theme';
import { Button, Text, TextInput } from 'react-native-paper';
import {
	View,
	FlatList,
	TouchableOpacity,
	Modal,
	KeyboardAvoidingView,
	StyleSheet,
} from 'react-native';
import { Task } from '../datatypes/datatypes';

type TIProps = {
	name: string;
	duration: string;
	energy: string;
	power: string;
	data;
	setName;
	setData;
	setDuration;
	setPower;
	setEnergy;
};

export const SlidingWindow = ({
	name,
	duration,
	energy,
	power,
	data,
	setName,
	setData,
	setDuration,
	setPower,
	setEnergy,
}: TIProps) => {
	const [showSlidingWindow, setShowSlidingWindow] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [showModal, setShowModal] = useState(false);

	const handleOpenSlideWindow = () => {
		setShowSlidingWindow(true);
	};

	const handleCloseSlideWindow = () => {
		setShowSlidingWindow(false);
	};

	type ItemProps = {
		task: Task;
	};

	const TaskItem = ({ task }: ItemProps) => (
		<TouchableOpacity
			style={styles.flatListItem}
			onPress={() => {
				selectTaskItem(task);
			}}
		>
			<View style={styles.flatListItemContent}>
				<View>
					<Text> {task.name}</Text>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => {
							setSelectedTask(task);
							setShowModal(true);
						}}
					>
						<Text>ℹ️</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);

	const renderTaskItem = ({ item }: { item: Task }) => {
		return <TaskItem task={item} />;
	};

	const selectTaskItem = (task: Task) => {
		setName(task.name);
		setDuration(task.duration.toString());
		setPower(task.power.toString());
		setEnergy(task.energy.toString());
		handleCloseSlideWindow();
	};

	const styles = StyleSheet.create({
		slidingWindow: {
			backgroundColor: '#fff',
		},
		containerTop: {
			flexDirection: 'row',
			paddingLeft: 10,
		},
		nameInputField: {
			height: 50,
			width: 330,
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
		slidingWindowHeader: {
			backgroundColor: '#009FFF',
			height: 60,
			justifyContent: 'center',
		},
		FlatListHeading: {
			paddingLeft: 10,
			paddingTop: 20,
			fontSize: 18,
			color: '#009FFF',
			borderBottomWidth: 1,
			borderColor: 'grey',
		},
		flatListItem: {
			height: 50,
			borderBottomWidth: 1,
			borderColor: 'grey',
			flexDirection: 'row',
			alignItems: 'center',
			paddingLeft: 10,
		},
		flatListItemContent: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '95%',
		},
		FlatListItemText: {
			fontSize: 16,
		},
		modalBackground: {
			flex: 1,
			backgroundColor: 'rba(0,0,0,0,5)',
			justifyContent: 'center',
			alignItems: 'center',
		},
		modalContainer: {
			width: '80%',
			height: '30%',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white',
			paddingHorizontal: 20,
			paddingVertical: 30,
			elevation: 20,
			borderRadius: 20,
			top: '20%',
			left: '10%',
		},
	});

	return (
		<View>
			<TouchableOpacity
				onPress={handleOpenSlideWindow}
				style={styles.nameInputField}
			>
				<Text style={styles.nameInputFieldText}>
					{name || 'Task Name'}
				</Text>
			</TouchableOpacity>

			<Modal visible={showSlidingWindow} animationType="slide">
				<KeyboardAvoidingView>
					<View style={styles.slidingWindowHeader}>
						<View style={styles.containerTop}>
							<TextInput
								mode="outlined"
								label="Task Name"
								placeholder={name || 'Task Name'}
								onChangeText={(text) => setName(text)}
								value={name}
								activeUnderlineColor={colors.blue.regular}
								activeOutlineColor={colors.blue.regular}
								outlineColor={colors.blue.regular}
								underlineColor={colors.blue.regular}
								style={{
									width: 300,
									height: 40,
								}}
							/>

							<TouchableOpacity
								onPress={handleCloseSlideWindow}
								style={{
									justifyContent: 'center',
									paddingLeft: 20,
								}}
							>
								<Text style={{ color: 'white' }}>Back</Text>
							</TouchableOpacity>
						</View>
					</View>

					<Text style={styles.FlatListHeading}> Previous tasks </Text>
					<FlatList data={data} renderItem={renderTaskItem} />
				</KeyboardAvoidingView>
			</Modal>

			<Modal
				visible={showModal}
				style={styles.modalBackground}
				transparent
			>
				<View style={styles.modalContainer}>
					<Text
						style={{
							paddingBottom: 10,
							fontSize: 18,
							color: '#009FFF',
						}}
					>
						{selectedTask?.name}
					</Text>
					<Text>Duration: {selectedTask?.duration} minutes</Text>
					<Text>Power: {selectedTask?.power} Watts</Text>
					<Text>Energy: {selectedTask?.energy} kWh</Text>

					<View style={{ paddingTop: 30 }}>
						<Button
							buttonColor={colors.blue.regular}
							textColor="white"
							onPress={() => {
								setShowModal(false);
							}}
						>
							{' '}
							Close{' '}
						</Button>
					</View>
				</View>
			</Modal>
		</View>
	);
};
