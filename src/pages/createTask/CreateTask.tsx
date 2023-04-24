import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Avatar, Button, Text, TextInput } from 'react-native-paper';
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

			const dateNow = new Date();
			const scheduledTasks = await StorageService.getAllTasks(dateNow); // we only want active tasks
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
			setErrorModal(true)
			console.log(error);
		}
	};

	const saveTask = async () => {
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
			shadowColor: 'rgba(0,0,0,0.1)',
			shadowOpacity: 1,
			shadowRadius: 4,
			shadowOffset: {
				width: 0,
				height: 2,
			},
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
			marginBottom: 30,
			shadowColor: 'rgba(0,0,0,0.1)',
			shadowOpacity: 1,
			shadowRadius: 4,
			shadowOffset: {
				width: 0,
				height: 2,
			},
		},
		cardScheduleContent:{
			width: '90%',
		},
		alertIcon:{
			backgroundColor: 'transparent',
			width: 40,
			height: 40,
		},
		alertButton: {
			width: 100,	
		}
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
						buttonColor="#4caf50"
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
								style={{ color: '#009FFF', paddingBottom: 10, textAlign: 'center'}}
								>
								Scheduling task failed!{'\n'} Could not connect to server
							</Text>
							<Avatar.Icon
								size={60}
								icon="alert-circle"
								color='red'
								style={styles.alertIcon}
							/>
							<Button
								buttonColor={colors.blue.regular}
								textColor={colors.neutral.white}
								style={styles.alertButton}
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
