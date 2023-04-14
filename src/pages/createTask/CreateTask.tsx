import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Button, Text, TextInput } from 'react-native-paper';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';

import CreateNewTaskInputs from '../../components/taskInputFields';
import ResultArea from '../../components/ResultArea';
import { Interval, Task} from '../../datatypes/datatypes';
import FindStartDateButton from '../../components/FindStartTimeButton';
import { components, typography, colors, space } from '../../styles/theme';
import { StorageService } from '../../utils/storage';
import { SlidingWindow } from '../../components/PreviousTasksTemplate';
import TimeConstraintModule from '../../components/TimeConstraintModule';

const CreateTask: React.FunctionComponent<IStackScreenProps> = (props) => {
	const { navigation, route, nameProp } = props;
	const [isModalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState<string>('');
	const [duration, setDuration] = useState<string>();
	const [power, setPower] = useState<string>();
	const [energy, setEnergy] = useState<string>();
	const [startDate, setStartDate] = useState<number>();
	const [loading, setLoading] = useState<boolean>(false);
	const [errorModal, setErrorModal] = useState<boolean>(false);
	const [allPreviousTasks, setAllPreviousTasks] = useState<readonly Task[]>([]);
	const [previousTaskInUse, setPreviousTaskInUse] = useState(false);
	const [startInterval, setStartInterval] = useState<{ start_interval: Interval }[]>([]);
	const [endInterval, setEndInterval] = useState<{ end_interval: Interval }[]>([]);
	
	

	const getPreviousTasks = async () => {
		setAllPreviousTasks(await StorageService.getAllTasks());
	};

	useEffect(() => {
		getPreviousTasks();
	}, []);

	const saveTask = async () => {
		const newTask: Task = {
			id: uuid.v4().toString(),
			name: name,
			duration: parseFloat(duration),
			power: parseFloat(power),
			energy: parseFloat(energy),
			startDate: startDate,
			must_start_between: startInterval,
			must_end_between: endInterval,
		};

		await StorageService.saveTask(newTask);
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
		},
		button: {
			alignSelf: 'center',
			...components.buttons.primary.contained,
		},
		containerbutton: {
			...components.buttons.primary.contained,
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
	});

	return (
		<View style={styles.screenContainer}>
			<View>
				<Text variant="headlineLarge" style={styles.heading}>
					{' '}
					Create Task{' '}
				</Text>
			</View>

			<SlidingWindow
				name={name}
				allPreviousTasks={allPreviousTasks}
				setName={setName}
				setData={setAllPreviousTasks}
				setDuration={setDuration}
				setPower={setPower}
				setEnergy={setEnergy}
				setPreviousTaskInUse={setPreviousTaskInUse}
			/>

			<CreateNewTaskInputs
				duration={duration}
				power={power}
				energy={energy}
				screenName={route.name}
				setDuration={setDuration}
				setPower={setPower}
				setEnergy={setEnergy}
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

			<FindStartDateButton
				name={name}
				duration={duration}
				power={power}
				energy={energy}
				startDate={startDate}
				setStartDate={setStartDate}
				setLoading={setLoading}
				setError={setErrorModal}
			/>

			<ResultArea time={startDate} loading={loading} />

			<View style={styles.container}>
				<Button
					mode="contained"
					style={styles.containerbutton}
					buttonColor={colors.blue.regular}
					onPress={() => navigation.navigate('Home')}
				>
					Back
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
					Save
				</Button>
			</View>

			<Modal isVisible={isModalVisible}>
				<View style={styles.modalBackground}>
					<View style={styles.modalContainer}>
						<Text style={{ color: '#009FFF', paddingBottom: 10 }}>
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

export default CreateTask;
