import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Modal from 'react-native-modal';
import * as React from 'react';
import ResultArea from '../../components/ResultArea';
import EditButtons from '../../components/EditButtons';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateNewTaskInputs from '../../components/taskInputFields';
import { useState } from 'react';
import FindStartDateButton from '../../components/FindStartTimeButton';
import { Task } from '../../datatypes/datatypes';
import { components, typography, colors, space } from '../../styles/theme';
import { StorageService } from '../../utils/storage';

const EditTask: React.FunctionComponent<IStackScreenProps> = (props) => {
	const { navigation, route, nameProp } = props;
	const { id, name, duration, energy, power, startDate } = route.params.data;

	const [newDuration, setDuration] = useState<string>(duration.toString());
	const [newEnergy, setEnergy] = useState<string>(energy.toString());
	const [newPower, setPower] = useState<string>(power.toString());
	const [newStartDate, setStartDate] = useState<number>(startDate);
	const [disabledDuration, setDurationDisabled] = useState<boolean>(false);
	const [disabledEnergy, setEnergyDisabled] = useState<boolean>(false);
	const [disabledPower, setPowerDisabled] = useState<boolean>(false);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [modalText, setModalText] = React.useState<string>('');
	const [saveModal, setSaveModal] = React.useState<boolean>(false);
	const [errorModal, setErrorModal] = useState<boolean>(false);
	const [previousTaskInUse, setPreviousTaskInUse] = useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => {
		setVisible(false);
	};

	const saveTask = async () => {
		const updatedTask: Task = {
			id: id,
			name: name,
			duration: parseFloat(newDuration),
			power: parseFloat(newPower),
			energy: parseFloat(newEnergy),
			startDate: newStartDate,
		};

		await StorageService.updateTask(updatedTask);
	};

	const removeTask = async () => {
		await StorageService.deleteTask(id)
	};
	const handleSave = () => {
		setModalText('Are you sure you want to save changes?');
		setSaveModal(true);
		showModal();
	};

	const handleCancel = () => {
		reroute();
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
			...typography.pageHeader.big,
		},
		subheading: {
			alignSelf: 'center',
			...typography.pageHeader.medium,
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
			marginTop: space.spacing.l
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
		<View style={styles.container}>
			<View>
				<Text variant="headlineLarge" style={styles.heading}>
					{name}
					{'\n'}
					<Text variant="headlineSmall" style={styles.subheading}>
						{' '}
						Edit
					</Text>
				</Text>
			</View>

			<CreateNewTaskInputs
				duration={newDuration}
				power={newPower}
				energy={newEnergy}
				durationDisabled={disabledDuration}
				powerDisabled={disabledPower}
				energyDisabled={disabledEnergy}
				screenName={route.name}
				setDuration={setDuration}
				setPower={setPower}
				setEnergy={setEnergy}
				setDurationDisabled={setDurationDisabled}
				setPowerDisabled={setPowerDisabled}
				setEnergyDisabled={setEnergyDisabled}
				setStartDate={setStartDate}
				previousTaskInUse={previousTaskInUse}
				setPreviousTaskInUse={setPreviousTaskInUse}
			/>

			<FindStartDateButton
				name={name}
				duration={newDuration}
				power={newPower}
				energy={newEnergy}
				startDate={newStartDate}
				setStartDate={setStartDate}
				setError={setErrorModal}
			/>

			<ResultArea time={newStartDate} />

			<View style={styles.editButtons}>
				<EditButtons
					delete={handleDelete}
					save={handleSave}
					cancel={handleCancel}
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
	);
};

export default EditTask;