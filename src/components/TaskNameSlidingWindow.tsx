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
	ScrollView,
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

export const TaskNameSlidingWindow = ({
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
	};

	const handleCloseSlideWindow = () => {
		setShowSlidingWindow(false);
	};

	const TaskItem = ({ task }: ItemProps) => {
		const [showInfo, setShowInfo] = useState(false);
	
		const handleInfoPress = () => {
			setShowInfo(!showInfo);
		};
	
		return (
			<>
				<View style={styles.FlatListContainerItem}>
					<TouchableOpacity
						activeOpacity={1} // disable feedback
						style={styles.flatListItem}
						onPress={() => {
							selectTaskItem(task);
							setPreviousTaskInUse(true);
						}}
					>
						<View style={styles.flatListItemContent}>
							<Text style={{color: 'black'}}> {task.name}</Text>
						</View>
					</TouchableOpacity>

					<View style={styles.flatListItemShowInfo}>
						<TouchableOpacity onPress={handleInfoPress}>
							<Avatar.Icon
								style={styles.flatListItemIcon}
								size={50}
								color="#009FFF"
								icon={'information-outline'}
							/>
						</TouchableOpacity>
					</View>
				</View>

				{showInfo && (
					<View style={styles.infoContainer}>
						<Text>Duration: {task.duration} minutes</Text>
						<Text>Power: {task.power} Watts</Text>
						<Text>Energy: {task.energy} kWh</Text>
					</View>
				)}
			</>
		);
	};

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
		slidingWindowContent:{
			overflow: 'scroll',
			height: '100%',
			backgroundColor: '#f3f3f3'

		},
		containerTop: {
			flexDirection: 'row',
			paddingLeft: 10,
			paddingTop: 40,
		},
		nameInputField: {
			height: 42,
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
			backgroundColor:'white',
			justifyContent: 'center',
			shadowColor: 'rgba(0,0,0,0.1)',
			shadowOpacity: 1,
			shadowRadius: 4,
			shadowOffset: {
				width: 0,
				height: 2,
			},
		},
		slidingWindowBackButton:{
			color: '#009FFF', 
			fontSize: 16,
			fontWeight: 'bold',
		},
		FlatListHeadingSection:{
			// empty
		},
		FlatListHeading: {
			paddingLeft: 10,
			paddingTop: 20,
			fontSize: 18,
			color: '#009FFF',
		},
		FlatListContainerItem: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingTop: 15,
			shadowColor: 'rgba(0,0,0,0.1)',
			shadowOpacity: 1,
			shadowRadius: 4,
			shadowOffset: {
				width: 0,
				height: 2,
			},
		},
		flatListItem: {
			marginLeft: 15,
			height: 50,
			flexDirection: 'row',
			alignItems: 'center',
			paddingLeft: 10,
			backgroundColor: 'white',
			flex: 1,
		},
		flatListItemContent: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		flatListItemShowInfo: {
			marginRight: 15,
			backgroundColor: 'white',
			alignItems: 'center',
			justifyContent: 'center',
			width: 50,
		},
		flatListItemIcon: {
			width: 30,
			height: 30,
			backgroundColor: 'transparent',
		},
		infoContainer: {
			paddingLeft: 10,
			paddingVertical: 10,
			backgroundColor: '#C8EAFF',
			marginLeft: 15,
			marginRight: 15,
			shadowColor: 'rgba(0,0,0,0.1)',
			shadowOpacity: 1,
			shadowRadius: 4,
			shadowOffset: {
				width: 0,
				height: 2,
			},
		},
		noPrevTask: {
			paddingTop: 40,
			alignItems: 'center',
		}
	});

	return (
		<View>
			<TouchableOpacity
				onPress={handleOpenSlideWindow}
				style={styles.nameInputField}
			>
				<Text style={styles.nameInputFieldText}>
				{name || 'Task Name'}
				<Text style={{ color: 'red' }}>*</Text>
				</Text>
			</TouchableOpacity>

			<Modal visible={showSlidingWindow} animationType="slide">
				<View style={styles.slidingWindowContent}>
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
									backgroundColor:'white',
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

					<View style={styles.FlatListHeadingSection}>
						<Text style={styles.FlatListHeading}> Previous tasks </Text>
					</View>

	
					{filteredAllPreviousTasks.length === 0 ? (
						<View style={styles.noPrevTask}>
							<Text> You have no previous tasks</Text>
						
						</View>
					) : (
						<FlatList
							data={filteredAllPreviousTasks}
							renderItem={renderTaskItem}
						/>
					)
					}
		
				</View>
			</Modal>
		</View>
	);
};
