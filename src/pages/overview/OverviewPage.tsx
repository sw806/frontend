import React from 'react';
import { FC } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { colors, components, space, typography } from '../../styles/theme';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import OverviewInfoContainer from '../../components/OverviewInfoContainer';

const styles = StyleSheet.create({
	screenContainer: {
		...components.containers.screen,
	},
	heading: {
		alignSelf: 'center',
		...typography.pageHeader.small,
		textAlign: 'center',
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
		marginTop: space.spacing.xs,
	},
	text: {
		fontSize: typography.fontSizes.titleLarge.fontSize,
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
});

type OverviewProps = {
	navigation: NativeStackNavigationProp<any>;
	route: RouteProp<ParamListBase, any>;
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
	// @ts-ignore
	const {
		name,
		duration,
		energy,
		power,
		startDate,
		must_start_between,
		must_end_between,
		price,
	} = route.params.data;
	const taskStartDate = new Date(startDate * 1000).toLocaleString();

	return (
		<View style={styles.screenContainer}>
			<StatusBar barStyle="dark-content"/>
			<Text variant="displayLarge" style={styles.heading}>
				{' '}
				{name}{' '}
			</Text>
			<Card style={styles.cardContainer} mode="elevated">
				<Card style={styles.card} mode="contained">
					<Card.Content style={styles.content}>
						<Avatar.Icon
							size={70}
							icon="calendar-clock"
							style={styles.icon}
						/>
						<Text style={styles.text}>{taskStartDate}</Text>
					</Card.Content>
				</Card>
				<View style={styles.infoContainer}>
					<View>
						<OverviewInfoContainer
							icon="clock-outline"
							text={duration + ' minutes'}
						/>
						<OverviewInfoContainer
							icon="lightning-bolt-outline"
							text={power + ' kW'}
						/>
					</View>
					<View>
						<OverviewInfoContainer
							icon="piggy-bank-outline"
							text={price.toFixed(2) + ' Kr.'}
						/>
						<OverviewInfoContainer
							icon="power-plug-outline"
							text={energy + ' kWh'}
						/>
					</View>
				</View>
			</Card>
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
						buttonColor="#4fc3f7"
						textColor="#ffffff"
						onPress={() => goEdit(navigation, route.params.data)}
					>
						Edit
					</Button>
				</View>
			</View>
		</View>
	);
};

export default OverviewPage;
