import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Modal from 'react-native-modal';
import * as React from 'react';
import ResultArea from '../../components/ResultArea';
import EditButtons from '../../components/EditButtons';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import CreateNewTaskInputs from '../../components/taskInputFields';
import { useEffect, useState } from 'react';
import FindStartDateButton from '../../components/FindStartTimeButton';
import { Task, Interval } from '../../datatypes/datatypes';
import { components, typography, colors, space } from '../../styles/theme';
import { StorageService } from '../../utils/storage';
import TimeConstraintModule from '../../components/TimeConstraintModule';
import { ScrollView } from 'react-native-gesture-handler';
import { NotificationService } from '../../utils/notificationsService';

const EditTask: React.FunctionComponent<IStackScreenProps> = (props) => {
	const { navigation, route, nameProp } = props;
	const { id, name, duration, energy, power, startDate, must_start_between, must_end_between } =
		route.params.data;
	const [newDuration, setDuration] = useState<string>(duration != undefined ? duration.toString() : "NaN");
	const [newEnergy, setEnergy] = useState<string>(energy != undefined ? energy.toString() : "NaN");
	const [newPower, setPower] = useState<string>(power != undefined ? power.toString() : "NaN");
	const [newStartDate, setStartDate] = useState<number>(startDate);
	const [newStartInterval, setStartInterval] = useState<{ start_interval: Interval }[]>(must_start_between);
	const [newEndInterval, setEndInterval] = useState<{ end_interval: Interval }[]>(must_end_between);
	const [loading, setLoading] = useState<boolean>(false);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [modalText, setModalText] = React.useState<string>('');
	const [saveModal, setSaveModal] = React.useState<boolean>(false);
	const [errorModal, setErrorModal] = useState<boolean>(false);
	const [previousTaskInUse, setPreviousTaskInUse] = useState(false);
	
	const showModal = () => setVisible(true);

	const hideModal = () => {
		setVisible(false);
	};

	useEffect(() => {
		// TODO reset startdate when constraints changes
	}, [newStartInterval, newEndInterval]);

	const saveTask = async () => {
		const updatedTask: Task = {
			id: id,
			name: name,
			duration: parseFloat(newDuration),
			power: parseFloat(newPower),
			energy: parseFloat(newEnergy),
			startDate: newStartDate,
			must_start_between: newStartInterval,
			must_end_between: newEndInterval,
		};

		await StorageService.updateTask(updatedTask);
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
	}

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
			textAlign: 'center',
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
	});

	return (
		<ScrollView>
		<View style={styles.container}>
			<View>

				<Text variant="displayLarge" style={styles.heading}>
					{name}
				</Text>
			</View>

			<CreateNewTaskInputs
				duration={newDuration}
				power={newPower}
				energy={newEnergy}
				screenName={route.name}
				setDuration={setDuration}
				setPower={setPower}
				setEnergy={setEnergy}
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

			<FindStartDateButton
				name={name}
				duration={newDuration}
				power={newPower}
				energy={newEnergy}
				startDate={newStartDate}
				setStartDate={setStartDate}
				setLoading={setLoading}
				setError={setErrorModal}
			/>

			<ResultArea time={newStartDate} loading={loading} />

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
						<Text style={{ color: '#009FFF', paddingBottom: 10 }}>
							Error connecting to server!{'\n'}Please check your
							connection and try again
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
