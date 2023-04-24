import React from 'react';
import { FC } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { colors, components, space, typography } from '../../styles/theme';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import OverviewInfoContainer from '../../components/OverviewInfoContainer';
import {NotificationService} from "../../utils/notificationsService";
import {StorageService} from "../../utils/storage";

const styles = StyleSheet.create({
	screenContainer: {
		...components.containers.screen,
	},
	heading: {
		alignSelf: 'center',
		...typography.pageHeader.small,
		color: '#009FFF',
		textAlign: 'center',
		width: '90%',
		position: 'relative',
	},
	cardContainer: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
		paddingTop: 4,
		paddingBottom: 8,
		marginBottom: 2,
	},
	infoContainer: {
		flexDirection: 'row',
	},
	dualContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	btn: {
		...components.buttons.unstyled.contained,
	},
	content: {
		...components.containers.results,
	},
	card: {
		margin: 4,
		backgroundColor: '#009FFF',
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: "white"
	},
	icon: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
	},
	container: {
		width: '80%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: space.spacing.s,
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

type OverviewProps = {
	navigation: NativeStackNavigationProp<never>;
	route: RouteProp<ParamListBase, never>;
};

const goBack = (nav) => {
	nav.jumpTo('Home');
};

const goEdit = (nav, data) => {
	nav.jumpTo('Edit Task', { data: data });
};

const timeOptions = {
	hour12: false,
	hour: '2-digit',
	minute: '2-digit',
	weekday: 'short',
};
const OverviewPage: FC = (props: OverviewProps) => {
	const { navigation, route } = props;
	const {
		id,
		name,
		duration,
		energy,
		power,
		startDate,
		must_start_between,
		must_end_between,
		price,
		highestPrice,
		co2Emission,
		highestCo2Emission
	} = route.params.data;
	const currentDate = new Date();
	return (
		<View style={styles.screenContainer}>
			<StatusBar barStyle="dark-content"/>

			<View style={styles.headerContent}>
					<TouchableOpacity
						onPress={() => goBack(navigation)}
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

			<Card style={styles.cardContainer} mode="elevated">
				<Card style={styles.card} mode="contained">
					<Card.Content style={styles.content}>
						<Avatar.Icon
							size={70}
							icon="calendar-clock"
							style={styles.icon}
							color={"black"}
						/>
						<Text style={styles.text}>{getDateStartAndEnd(startDate, duration, currentDate)}</Text>
					</Card.Content>
				</Card>
				<View style={styles.infoContainer}>
					<View>
						<OverviewInfoContainer
							icon="molecule-co2"
							text={co2Emission.toFixed(2) + ' g/kWh\n'}
						/>
						<OverviewInfoContainer
							icon="lightning-bolt-outline"
							text={power + ' kW\n'}
						/>
					</View>
					<View>
						<OverviewInfoContainer
							icon="piggy-bank-outline"
							text={PriceAndMoneySaved(price, highestPrice)}
						/>
						<OverviewInfoContainer
							icon="power-plug-outline"
							text={energy + ' kWh\n'}
						/>
					</View>
				</View>
			</Card>

			{CanEdit(startDate, currentDate, duration, navigation, route, id)}
		</View>
	);
};

const getDateStartAndEnd = (date, duration, currentDate) => {
	const taskStartDate = new Date(date * 1000);
	const taskEndDate = new Date(taskStartDate.getTime() + duration * 60000);
	if (currentDate.getMonth() !== taskStartDate.getMonth() && currentDate.getDay() === taskStartDate.getDay()) {
		return taskStartDate.toLocaleTimeString() + "-" + taskEndDate.toLocaleTimeString();
	} else if (currentDate.getTime() > taskEndDate.getTime()) {
		return "Finished"
	} else {
		return taskStartDate.toLocaleString() + " - " + taskEndDate.toLocaleString();
	}
}

const PriceAndMoneySaved = (price, highest) => {
	const actualPrice = price.toFixed(2) + ' Kr.'
	const moneySaved = (highest - price).toFixed(2) + ' Kr.'
	return " " + actualPrice + "\n-" + moneySaved;
}

const removeTask = async (id, nav) => {
	await NotificationService.removeTaskNotification(id);
	await StorageService.deleteTask(id);
	nav.goBack();
};

const CanEdit = (startDate, currentDate, duration, navigation, route, id) => {
	const taskStartDate = new Date(startDate * 1000);
	if (currentDate.getTime() > taskStartDate.getTime() + duration * 60000) {
		return (
			<View style={styles.container}>
				<View style={styles.dualContainer}>
					<Button
						style={styles.btn}
						mode="elevated"
						buttonColor="#607d8b"
						textColor="#ffffff"
						onPress={() => goBack(navigation)}
					>
						Back
					</Button>
					<Button
						style={styles.btn}
						mode="elevated"
						buttonColor="#009FFF"
						textColor="#ffffff"
						onPress={() => goEdit(navigation, route.params.data)}
					>
						Edit
					</Button>
				</View>
			</View>
		)
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.dualContainer}>
					<Button
						style={styles.btn}
						mode="elevated"
						buttonColor="#607d8b"
						textColor="#ffffff"
						onPress={() => goBack(navigation)}
					>
						Back
					</Button>
					<Button
						style={styles.btn}
						mode="elevated"
						buttonColor="#d32f2f"
						textColor="#ffffff"
						onPress={() => removeTask(id, navigation)}
					>
						Delete
					</Button>
				</View>
			</View>
		)

	}
}
export default OverviewPage;
