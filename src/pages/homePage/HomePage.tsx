import { View, StyleSheet } from 'react-native';
import { Button, DataTable, Text } from 'react-native-paper';
import * as React from 'react';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import { ScrollView } from 'react-native-gesture-handler';
import { Task } from '../../datatypes/datatypes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { components, typography, colors, space } from '../../styles/theme';
import { StorageService } from '../../utils/storage';

const styles = StyleSheet.create({
	screenContainer: {
		...components.containers.screen,
	},
	heading: {
		alignSelf: 'center',
		...typography.pageHeader.big,
	},
	scheduleContainer: {
		flex: 1,
		verticalAlign: 'top',
	},
	timeContainer: {
		borderRadius: 10,
		maxHeight: '85%',
		overflow: 'hidden',
		marginBottom: '2%',
		borderColor: '#7d34eb',
		borderWidth: 0,
	},
	timeRow: {
		backgroundColor: colors.blue.regular,
		color: colors.red.light,
		borderRadius: 3,
		borderWidth: 2,
		borderColor: colors.neutral.black,
		margin: space.spacing.xxs,
	},
	timeName: {
		flex: 6,
	},
	timeTime: {
		flex: 6,
	},
	timeArrow: {
		flex: 1,
	},
	textFormat: {
		color: colors.neutral.white,
	},
	button: {
		height: 40,
		width: 40,
		alignSelf: 'center',
		color: colors.blue.regular,
		borderColor: colors.blue.regular,
	},
});

const handleEditTask = (nav, data) => {
	nav.jumpTo('Overview', { data: data });
};

const HomePage = (props) => {
	const { navigation, route, nameProp } = props;
	const [data, setData] = React.useState<readonly Task[]>([]);
	const [taskColors, setTaskColors] = React.useState<{
		[id: string]: string;
	}>({});
	const timers = React.useRef<{ [id: string]: NodeJS.Timeout }>({});

	const setTaskColor = (id: string, color: string) => {
		setTaskColors((prevColors) => ({ ...prevColors, [id]: color }));
	};

	React.useEffect(() => {
		const fetchData = async () => {
			const tasks = await StorageService.getAllTasks();

			const sortedTasks = tasks.sort((a, b) => a.startDate - b.startDate);

			setData(sortedTasks);

			tasks.forEach((task) => {
				const currentTime = new Date().getTime();
				console.log('Start date', task.startDate);
				const taskEndTime =
					new Date(task.startDate * 1000).getTime() +
					task.duration * 60 * 1000;
				const remainingTime = taskEndTime - currentTime;

				console.log('Remaining time:', remainingTime);

				console.log('Calc in hours', remainingTime / 1000 / 60 / 60);

				if (remainingTime > 0) {
					timers.current[task.id] = setTimeout(() => {
						setTaskColor(task.id, colors.red.light);
					}, remainingTime);
				} else {
					setTaskColor(task.id, colors.red.light);
				}
			});
		};

		fetchData();

		return () => {
			// Clear timers on component unmount
			Object.values(timers.current).forEach((timer) => {
				clearTimeout(timer);
			});
		};
	}, []);

	return (
		<View style={styles.screenContainer}>
			<Text variant="displayLarge" style={styles.heading}>
				{' '}
				WattsDown{' '}
			</Text>
			<View style={styles.scheduleContainer}>
				<View style={styles.timeContainer}>
					<ScrollView>
						{data?.map((d) => (
							<DataTable.Row
								key={d ? d.id : 0}
								onPress={() => {
									if (taskColors[d.id] !== colors.red.light) {
										handleEditTask(navigation, d);
									}
								}}
								style={[
									styles.timeRow,
									{
										backgroundColor:
											taskColors[d.id] ||
											colors.blue.regular,
									},
								]}
							>
								<DataTable.Cell
									textStyle={styles.textFormat}
									style={styles.timeName}
								>
									{d ? d.name : 0}
								</DataTable.Cell>
								<DataTable.Cell
									textStyle={styles.textFormat}
									style={styles.timeTime}
								>
									{new Date((d ? d.startDate : 0) * 1000)
										.toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
										})
										.replace('.', ':')}
								</DataTable.Cell>
								<DataTable.Cell
									textStyle={styles.textFormat}
									style={styles.timeArrow}
								>
									{'>'}
								</DataTable.Cell>
								<DataTable.Cell
									textStyle={styles.textFormat}
									style={styles.timeTime}
								></DataTable.Cell>
							</DataTable.Row>
						))}
					</ScrollView>
				</View>
				<Button
					mode="outlined"
					style={styles.button}
					buttonColor="#00000000"
					textColor="#009FFF"
					onPress={() => navigation.jumpTo('Create Task')}
				>
					<Icon name="plus" />
				</Button>
			</View>
		</View>
	);
};

export default HomePage;
