import { View, StyleSheet } from 'react-native';
import { Button, DataTable, Text } from 'react-native-paper';
import * as React from 'react';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Task } from '../../datatypes/datatypes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { components, typography, colors, space } from '../../styles/theme';

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
	nav.jumpTo('Edit Task', { data: data });
};

const HomePage = (props) => {
	const { navigation, route, nameProp } = props;

	const [minutes, setMinutes] = React.useState('');
	const [energy, setEnergy] = React.useState('');
	const [data, setData] = React.useState<readonly Task[]>([]);

	const getData = async () => {
		try {
			// get saved keys
			const keys = await AsyncStorage.getAllKeys();
			const data = await AsyncStorage.multiGet(keys);

			setData(data.map((d) => JSON.parse(d[1])));
		} catch (error) {
			console.log(error);
		}
	};

	getData();

	return (
		<View style={styles.screenContainer}>
			<Text variant="displayLarge" style={styles.heading}>
				{' '}
				WattsDown{' '}
			</Text>
			<View style={styles.scheduleContainer}>
				<View style={styles.timeContainer}>
					<ScrollView>
						{data.map((d) => (
							<DataTable.Row
								key={d ? d.id : 0}
								onPress={() => handleEditTask(navigation, d)}
								style={styles.timeRow}
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
