import { View, StyleSheet, StatusBar, TouchableOpacity  } from 'react-native';
import { Avatar, Button, DataTable, Text } from 'react-native-paper';
import * as React from 'react';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import { ScrollView } from 'react-native-gesture-handler';
import { Task } from '../../datatypes/datatypes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { components, typography, colors, space } from '../../styles/theme';
import { StorageService } from '../../utils/storage';
import CreateTask from '../createTask/CreateTask';

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
	timeRowRunning: {
		backgroundColor: colors.green.regular,
		color: colors.neutral.black,
		borderRadius: 3,
		borderWidth: 2,
		borderColor: colors.green.dark,
		margin: space.spacing.xxs,
	},
	timeRowPlanned: {
		backgroundColor: colors.blue.regular,
		color: colors.neutral.black,
		borderRadius: 3,
		borderWidth: 2,
		borderColor: colors.blue.regular,
		margin: space.spacing.xxs,
	},
	timeRowFinished: {
		backgroundColor: colors.red.light,
		color: colors.neutral.black,
		borderRadius: 3,
		borderWidth: 2,
		borderColor: colors.red.light,
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
	emptyTaskContainer:{
		marginTop: 50,
		alignContent: 'center',
		alignItems: 'center'
	},
	emptyTask: {
		alignSelf: 'center',
	},
	emptyTaskIcon: {
		backgroundColor: 'transparent'
	}
});

const handleEditTask = (nav, data) => {
	nav.jumpTo('Overview', { data: data });
};

const handleCreateTask = (nav) => {
	nav.jumpTo('Create Task');
}

const HomePage = (props) => {
	const { navigation, route, nameProp } = props;
	const [data, setData] = React.useState<readonly Task[]>([]);
	const [currentTime, setCurrentTime] = React.useState<Date>(new Date());

	const fetchData = async () => {
		const tasks = await StorageService.getAllTasks();

		const tasksCopy = [...tasks];

		tasksCopy.sort((a, b) => {
			const dateA = new Date(a.startDate);
			const dateB = new Date(b.startDate);

			if (dateA < dateB) return -1;
			if (dateA > dateB) return 1;

			return 0;
		});
		setData(tasksCopy);
	};

	fetchData();

	return (
		<View style={styles.screenContainer}>
			<StatusBar barStyle="dark-content"/>
			<Text variant="displayLarge" style={styles.heading}>
				{' '}
				WattsDown{' '}
			</Text>
			<View style={styles.scheduleContainer}>
				<View style={styles.timeContainer}>
					{data.length === 0 && 
						<View style={styles.emptyTaskContainer}>
							<Text style={styles.emptyTask}>You have no tasks yet</Text>
							<Text style={styles.emptyTask}>Let's create a one!</Text>

							<TouchableOpacity
								onPress={() =>
									handleCreateTask(navigation)
								}
							>
								<Avatar.Icon
									style={styles.emptyTaskIcon}
									size={70}
									color="#009FFF"
									icon={ "plus-circle-outline"}
								/>
							</TouchableOpacity>
						</View>
					}
					<ScrollView>
						{data
							?.filter(
								(f) =>
									(f.startDate * 1000 <=
										currentTime.getTime() &&
										f.startDate * 1000 +
											f.duration * 60000) >=
									currentTime.getTime()
							)
							.map((d) => (
								<DataTable.Row
									onPress={() =>
										handleEditTask(navigation, d)
									}
									key={d ? d.id : 0}
									style={styles.timeRowRunning}
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
										{new Date( d.startDate * 1000)
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
								</DataTable.Row>
							))}
					</ScrollView>
					<View style={{ marginVertical: 10 }}></View>
					<ScrollView>
						{data
							?.filter(
								(f) =>
									f.startDate * 1000 > currentTime.getTime()
							)
							.map((d) => (
								<DataTable.Row
									onPress={() =>
										handleEditTask(navigation, d)
									}
									key={d ? d.id : 0}
									style={styles.timeRowPlanned}
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
								</DataTable.Row>
							))}
					</ScrollView>
					<View style={{ marginVertical: 10 }}></View>
					<ScrollView>
						{data
							?.filter(
								(f) =>
									f.startDate * 1000 + f.duration * 60000 <
									currentTime.getTime()
							)
							.map((d) => (
								<DataTable.Row
									onPress={() =>
										handleEditTask(navigation, d)
									}
									key={d ? d.id : 0}
									style={styles.timeRowFinished}
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
										{'finished'}
									</DataTable.Cell>
									<DataTable.Cell
										textStyle={styles.textFormat}
										style={styles.timeArrow}
									>
										{'>'}
									</DataTable.Cell>
								</DataTable.Row>
							))}
					</ScrollView>
				</View>
			</View>
		</View>
	);
};

export default HomePage;
