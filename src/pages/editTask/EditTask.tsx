import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import Modal from 'react-native-modal';
import * as React from 'react';
import ResultArea from '../../components/ResultArea';
import EditButtons from '../../components/EditButtons';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import TaskUnitInput from '../../components/TaskUnitInput';
import { useEffect, useState } from 'react';
import FindStartDateButton from '../../components/FindStartTimeButton';
import { Task, Interval } from '../../datatypes/datatypes';
import { components, typography, colors, space } from '../../styles/theme';
import { StorageService } from '../../utils/storage';
import TimeConstraintModule from '../../components/TimeConstraintModule';
import { ScrollView } from 'react-native-gesture-handler';
import { NotificationService } from '../../utils/notificationsService';
import { ScheduleApiV2 } from '../../api/scheduleApiV2';

const EditTask: React.FunctionComponent<IStackScreenProps> = (props) => {
	const { navigation, route, nameProp } = props;
	const {
		id,
		name,
		duration,
		energy,
		power,
		startDate,
		price,
		must_start_between,
		must_end_between,
	} = route.params.data;
	const [newDuration, setDuration] = useState<string>(
		duration != undefined ? duration.toString() : 'NaN'
	);
	const [newEnergy, setEnergy] = useState<string>(
		energy != undefined ? energy.toString() : 'NaN'
	);
	const [newPower, setPower] = useState<string>(
		power != undefined ? power.toString() : 'NaN'
	);
	const [newStartDate, setStartDate] = useState<number>(startDate);
	const [newStartInterval, setStartInterval] =
		useState<{ start_interval: Interval }[]>(must_start_between);
	const [newEndInterval, setEndInterval] =
		useState<{ end_interval: Interval }[]>(must_end_between);
	const [newPrice, setPrice] = useState<number>(price != undefined ? price : 'NaN');
	const [loading, setLoading] = useState<boolean>(false);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [modalText, setModalText] = React.useState<string>('');
	const [saveModal, setSaveModal] = React.useState<boolean>(false);
	const [errorModal, setErrorModal] = useState<boolean>(false);
	const [previousTaskInUse, setPreviousTaskInUse] = useState(false);
	const [rescheduledTask, setRescheduledTask] = useState<Task>();

	const showModal = () => setVisible(true);

	const hideModal = () => {
		setVisible(false);
	};

	const scheduleTask = async () => {
		try {
			const scheduledTask: Task = {
				id: id,
				name: name,
				duration: parseFloat(newDuration),
				power: parseFloat(newPower),
				energy: parseFloat(newEnergy),
				price: newPrice,
				must_start_between: newStartInterval,
				must_end_between: newEndInterval,
			};

			const scheduledTasks = await StorageService.getAllTasks();
			const settings = await StorageService.getSettings();

			const rescheduledTask: Task = await ScheduleApiV2.rescheduleTask(
				scheduledTask,
				[...scheduledTasks],
				{
					maximumPowerConsumption: {
						maximum_consumption: settings?.max_consumption,
					},
				}
			);

			setRescheduledTask(rescheduledTask);
			setStartDate(rescheduledTask.startDate);
			setPrice(rescheduledTask.price);
		} catch (error) {
			console.log(error);
		}
	};

	const saveTask = async () => {
		await StorageService.updateTask(rescheduledTask);
	};

	const removeTask = async () => {
		await NotificationService.removeTaskNotification(id);
		await StorageService.deleteTask(id);
	};
	const handleSave = () => {
		setModalText('Are you sure you want to save changes?');
		setSaveModal(true);
		showModal();
	};

	const navigateToOverview = (nav, data) => {
		nav.jumpTo('Overview', { data: data });
	};

	const backToOverview = () => {
		navigateToOverview(navigation, route.params.data);
	};

	const handleDelete = () => {
		setModalText('Are you sure you want to delete this task?');
		setSaveModal(false);
		showModal();
	};

	const reroute = () => {
		hideModal();
		navigation.navigate('Home');
	};

	const modalCancel = () => {
		hideModal();
	};

	const modalSave = () => {
		saveTask()
			.then(() => reroute())
			.catch(() => console.log('failure'));
	};

	const modalDelete = () => {
		removeTask()
			.then(() => reroute())
			.catch(() => console.log("couldn't delete"));
	};

	const styles = StyleSheet.create({
		heading: {
			alignSelf: 'center',
			...typography.pageHeader.small,
			color: '#009FFF',
			textAlign: 'center',
			width: '90%',
			position: 'relative',
		},
		subheading: {
			alignSelf: 'center',
			...typography.pageHeader.small,
			fontSize: 30,
		},
		ScheduleBtn: {
			marginTop: '3%',
			display: 'flex',
			alignItems: 'center',
		},
		container: {
			...components.containers.screen,
		},
		editButtons: {
			position: 'relative',
			bottom: 5,
			width: '100%',
		},
		modalBackground: {
			...components.containers.modals.background,
		},
		modalContainer: {
			...components.containers.modals.contained,
		},
		btn: {
			...components.buttons.unstyled.contained,
			width: 100,
			marginTop: space.spacing.l,
		},
		dualContainer: {
			flexDirection: 'row',
			alignSelf: 'center',
		},
		containerStyle: {
			backgroundColor: 'white',
			padding: 20,
		},
		cardIntputBackground:{
			backgroundColor: 'white',
			alignItems: 'center',
			borderRadius: 10,
			height: 230,
			marginBottom: 20,
		},
		cardInputContent:{
			width: '90%',
		},
		cardScheduleBackground:{
			backgroundColor: 'white',
			alignItems: 'center',
			borderRadius: 10,
			height: 170,
			marginBottom: 30,
		},
		cardScheduleContent:{
			width: '90%',
		},
		headerContent:{
			flexDirection: 'row',
			alignItems: 'center',
			paddingBottom: 20,
			paddingTop: 10,
		},
		backButton: {
			width: 30,
			height: 30,
			backgroundColor: 'transparent',
			color: 'black',
		},
	});

	return (
		<ScrollView>
			<StatusBar barStyle="dark-content"/>

			<View style={styles.container}>

				<View style={styles.headerContent}>
					<TouchableOpacity
						onPress={backToOverview}
					>
						<Avatar.Icon
							style={styles.backButton}
							size={40}
							icon="arrow-left"
							color='black'
						/>
					</TouchableOpacity>

					<View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
						<Text variant="displayMedium" style={styles.heading}>
							{name}
						</Text>
					</View>
				</View>

				<View style={styles.cardIntputBackground}>
					<View style={styles.cardInputContent}>	
						<TaskUnitInput
							duration={newDuration}
							power={newPower}
							energy={newEnergy}
							screenName={route.name}
							setDuration={setDuration}
							setPower={setPower}
							setEnergy={setEnergy}
							setPrice={setPrice}
							setStartDate={setStartDate}
							previousTaskInUse={previousTaskInUse}
							setPreviousTaskInUse={setPreviousTaskInUse}
						/>

						<TimeConstraintModule
							startInterval={newStartInterval}
							endInterval={newEndInterval}
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
					<ResultArea startTime={newStartDate} price={newPrice} loading={loading} />
				</View>

				<View style={styles.editButtons}>
					<EditButtons
						delete={handleDelete}
						save={handleSave}
						cancel={backToOverview}
					/>
				</View>

				<Modal isVisible={visible}>
					<View style={styles.modalBackground}>
						<View style={styles.modalContainer}>
							<Text variant="bodyMedium">{modalText}</Text>

							<View style={styles.dualContainer}>
								<Button
									style={styles.btn}
									mode="elevated"
									buttonColor="#607d8b"
									textColor="#ffffff"
									onPress={() => modalCancel()}
								>
									Cancel
								</Button>
								{saveModal && (
									<Button
								
										style={styles.btn}
										mode="elevated"
										buttonColor="#4caf50"
										textColor="#ffffff"
										disabled={!newStartDate}
										onPress={() => modalSave()}
									>
										Save
									</Button>
								)}
								{!saveModal && (
									<Button
										style={styles.btn}
										mode="elevated"
										buttonColor="#d32f2f"
										textColor="#ffffff"
										onPress={() => modalDelete()}
									>
										Delete
									</Button>
								)}
							</View>
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

export default EditTask;
