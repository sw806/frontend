import React, { useEffect, useState } from 'react';
import { colors } from '../styles/theme';
import { Button, Text, TextInput, Avatar } from 'react-native-paper';
import {
	View,
	FlatList,
	TouchableOpacity,
	Modal,
	KeyboardAvoidingView,
	StyleSheet,
} from 'react-native';
import { Task } from '../datatypes/datatypes';

type IProps = {
	name: string;
	allPreviousTasks;
	setName;
	setData;
	setDuration;
	setPower;
	setEnergy;
	setPreviousTaskInUse;
};

type ItemProps = {
	task: Task;
};

export const SlidingWindow = ({
	name,
	allPreviousTasks,
	setName,
	setDuration,
	setPower,
	setEnergy,
	setPreviousTaskInUse,
}: IProps) => {
	const [showSlidingWindow, setShowSlidingWindow] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [filteredAllPreviousTasks, setFilteredAllPreviousTasks] =
		useState<Task[]>(allPreviousTasks);
	const [search, setSearch] = useState('');

	useEffect(() => {
		setFilteredAllPreviousTasks(allPreviousTasks);
	}, [allPreviousTasks]);

	const handleOpenSlideWindow = () => {
		setShowSlidingWindow(true);
		console.log(allPreviousTasks)
	};

	const handleCloseSlideWindow = () => {
		setShowSlidingWindow(false);
	};

	const TaskItem = ({ task }: ItemProps) => (
		<TouchableOpacity
			style={styles.flatListItem}
			onPress={() => {
				selectTaskItem(task);
				setPreviousTaskInUse(true);
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
						<Avatar.Icon
							style={styles.flatListItemIcon}
							size={50}
							color="#009FFF"
							icon="information-outline"
						/>
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

	const searchFilter = (text: string) => {
		if (text) {
			const filteredTasks = allPreviousTasks.filter(function (task) {
				const taskData = task.name
					? task.name.toUpperCase()
					: ''.toUpperCase();
				const textData = text.toUpperCase();
				return taskData.indexOf(textData) > -1;
			});
			setFilteredAllPreviousTasks(filteredTasks);
			setSearch(text);
			setName(text);
		} else {
			setFilteredAllPreviousTasks(allPreviousTasks);
			setSearch(text);
			setName(text);
		}
	};

	const styles = StyleSheet.create({
		slidingWindow: {
			backgroundColor: 'black',
		},
		containerTop: {
			flexDirection: 'row',
			paddingLeft: 10,
			paddingTop: 40,
		},
		nameInputField: {
			height: 50,
			marginBottom: 10,
			backgroundColor: 'white',
			borderColor: '#009FFF',
			justifyContent: 'center',
			borderWidth: 1,
			borderRadius: 5,
		},
		nameInputFieldText: {
			color: '#524E57',
			paddingLeft: 11,
			fontSize: 16,
		},
		slidingWindowHeader: {
			height: 120,
			backgroundColor:'#f3f3f3',
			justifyContent: 'center',
			borderBottomWidth: 3,
			borderBottomColor: '#009FFF',
		},
		slidingWindowBackButton:{
			color: '#009FFF', 
			fontSize: 16,
			fontWeight: 'bold',
		},
		FlatListHeading: {
			paddingLeft: 10,
			paddingTop: 20,
			fontSize: 18,
			color: '#009FFF',
			borderBottomWidth: 1,
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
		flatListItemIcon: {
			width: 30,
			height: 30,
			backgroundColor: 'white',
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
				<KeyboardAvoidingView >
					<View style={styles.slidingWindowHeader}>
						<View style={styles.containerTop}>
							<TextInput
								mode="outlined"
								label="Task Name"
								placeholder={name || 'Task Name'}
								onChangeText={(text) => searchFilter(text)}
								value={name}
								activeUnderlineColor={colors.blue.regular}
								activeOutlineColor={colors.blue.regular}
								outlineColor={colors.blue.regular}
								underlineColor={colors.blue.regular}
								style={{
									width: 260,
									height: 40,
								}}
							/>

							<TouchableOpacity
								onPress={handleCloseSlideWindow}
								style={{
									justifyContent: 'center',
									paddingLeft: 30,
								}}
							>
								<Text style={styles.slidingWindowBackButton}> Okay </Text>
							</TouchableOpacity>
						</View>
					</View>

					<Text style={styles.FlatListHeading}> Previous tasks </Text>
					<FlatList
						data={filteredAllPreviousTasks}
						renderItem={renderTaskItem}
					/>
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
							Close
						</Button>
					</View>
				</View>
			</Modal>
		</View>
	);
};
