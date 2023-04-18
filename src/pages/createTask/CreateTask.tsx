import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Button, Text, TextInput } from 'react-native-paper';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';

import TaskUnitInput from '../../components/TaskUnitInput';
import ResultArea from '../../components/ResultArea';
import { Interval, Task } from '../../datatypes/datatypes';
import FindStartDateButton from '../../components/FindStartTimeButton';
import { components, typography, colors, space } from '../../styles/theme';
import { StorageService } from '../../utils/storage';
import { TaskNameSlidingWindow } from '../../components/TaskNameSlidingWindow';
import TimeConstraintModule from '../../components/TimeConstraintModule';
import { ScrollView } from 'react-native-gesture-handler';
import { NotificationService } from '../../utils/notificationsService';
import { ScheduleApiV2 } from '../../api/scheduleApiV2';

const CreateTask: React.FunctionComponent<IStackScreenProps> = (props) => {
	const { navigation, route, nameProp } = props;
	const [isModalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState<string>('');
	const [duration, setDuration] = useState<string>();
	const [power, setPower] = useState<string>();
	const [energy, setEnergy] = useState<string>();
	const [startDate, setStartDate] = useState<number>();
	const [price, setprice] = useState<number>();
	const [loading, setLoading] = useState<boolean>(false);
	const [errorModal, setErrorModal] = useState<boolean>(false);
	const [allPreviousTasks, setAllPreviousTasks] = useState<readonly Task[]>(
		[]
	);
	const [previousTaskInUse, setPreviousTaskInUse] = useState(false);
	const [startInterval, setStartInterval] = useState<
		{ start_interval: Interval }[]
	>([]);
	const [endInterval, setEndInterval] = useState<
		{ end_interval: Interval }[]
	>([]);
	const [scheduledTask, setScheduledTask] = useState<Task>();

	const getPreviousTasks = async () => {
		setAllPreviousTasks(await StorageService.getAllTemplateTasks());
	};

	useEffect(() => {
		getPreviousTasks();
	}, []);

	const scheduleTask = async () => {
		try {
			const unscheduledTask: Task = {
				id: uuid.v4().toString(),
				name: name,
				duration: parseFloat(duration),
				power: parseFloat(power),
				energy: parseFloat(energy),
				price: price,
				must_start_between: startInterval,
				must_end_between: endInterval,
			};

			const scheduledTasks = await StorageService.getAllTasks();
			const settings = await StorageService.getSettings();

			const scheduledTask: Task = await ScheduleApiV2.scheduleTask(
				unscheduledTask,
				[...scheduledTasks],
				{
					maximumPowerConsumption: {
						maximum_consumption: settings?.max_consumption,
					},
				}
			);

			setScheduledTask(scheduledTask);
			setStartDate(scheduledTask.startDate);
			setprice(scheduledTask.price);
		} catch (error) {
			console.log(error);
		}
	};

	const saveTask = async () => {
		console.log(scheduledTask);
		await StorageService.saveTask(scheduledTask);
		await NotificationService.createTaskNotification(scheduledTask);
		toggleModal();
	};
	
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const styles = StyleSheet.create({
		screenContainer: {
			...components.containers.screen,
		},
		heading: {
			...typography.pageHeader.big,
			alignSelf: 'center',
		},
		button: {
			alignSelf: 'center',
			...components.buttons.primary.contained,
		},
		containerbutton: {
			...components.buttons.primary.contained,
			backgroundColor: '#607d8b',
		},
		disabledButton: {
			...components.buttons.unstyled.contained,
		},
		container: {
			flexDirection: 'row',
			alignSelf: 'center',
		},
		modalBackground: {
			...components.containers.modals.background,
		},
		modalContainer: {
			...components.containers.modals.contained,
		},
		cardIntputBackground:{
			backgroundColor: 'white',
			alignItems: 'center',
			borderRadius: 10,
			height: 285,
			marginBottom: 20,
		},
		cardInputContent:{
			paddingTop: 10,
			width: '90%',
		},
		cardScheduleBackground:{
			backgroundColor: 'white',
			alignItems: 'center',
			borderRadius: 10,
			height: 170,
			marginBottom: 40,
		},
		cardScheduleContent:{
			width: '90%',
		},
	});

	return (
		<ScrollView>
			<StatusBar barStyle="dark-content"/>
			<View style={styles.screenContainer}>
				<View>
					<Text variant="headlineLarge" style={styles.heading}>
						{' '}
						Create Task{' '}
					</Text>
				</View>

				<View style={styles.cardIntputBackground}> 
					<View style={styles.cardInputContent}>
						<TaskNameSlidingWindow
							name={name}
							allPreviousTasks={allPreviousTasks}
							setName={setName}
							setData={setAllPreviousTasks}
							setDuration={setDuration}
							setPower={setPower}
							setEnergy={setEnergy}
							setPreviousTaskInUse={setPreviousTaskInUse}
						/>

						<TaskUnitInput
							duration={duration}
							power={power}
							energy={energy}
							screenName={route.name}
							setDuration={setDuration}
							setPower={setPower}
							setEnergy={setEnergy}
							setPrice={setprice}
							setStartDate={setStartDate}
							previousTaskInUse={previousTaskInUse}
							setPreviousTaskInUse={setPreviousTaskInUse}
						/>
						<TimeConstraintModule
							startInterval={startInterval}
							endInterval={endInterval}
							setStartInterval={setStartInterval}
							setEndInterval={setEndInterval}
						/>
					</View>
				</View>


				<View style={styles.cardScheduleBackground}> 
					<FindStartDateButton
						name={name}
						duration={duration}
						power={power}
						energy={energy}
						startDate={startDate}
						setLoading={setLoading}
						setError={setErrorModal}
						scheduleTask={scheduleTask}
					/>

					<ResultArea startTime={startDate} price={price} loading={loading} />
				</View>

				<View style={styles.container}>
					<Button
						mode="contained"
						style={styles.containerbutton}
						onPress={() => navigation.navigate('Home')}
					>
						Cancel
					</Button>

					<Button
						mode="contained"
						style={styles.disabledButton}
						buttonColor={colors.neutral.grey}
						disabled={!startDate}
						onPress={() => {
							saveTask();
						}}
					>
						Schedule
					</Button>
				</View>

				<Modal isVisible={isModalVisible}>
					<View style={styles.modalBackground}>
						<View style={styles.modalContainer}>
							<Text
								style={{ color: '#009FFF', paddingBottom: 10 }}
							>
								{' '}
								{name} scheduled!
							</Text>

							<Button
								buttonColor={colors.blue.regular}
								textColor={colors.neutral.white}
								onPress={() => navigation.navigate('Home')}
							>
								Home
							</Button>
						</View>
					</View>
				</Modal>
				<Modal isVisible={errorModal}>
					<View style={styles.modalBackground}>
						<View style={styles.modalContainer}>
							<Text
								style={{ color: '#009FFF', paddingBottom: 10 }}
							>
								Error connecting to server!{'\n'}Please check
								your connection and try again
							</Text>

							<Button
								buttonColor={colors.blue.regular}
								textColor={colors.neutral.white}
								onPress={() => setErrorModal(false)}
							>
								Close
							</Button>
						</View>
					</View>
				</Modal>
			</View>
		</ScrollView>
	);
};

export default CreateTask;
