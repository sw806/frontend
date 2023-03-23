import React from 'react';
import { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { components, typography } from '../../styles/theme';
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
		...typography.pageHeader.medium,
	},
	cardContainer: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
		paddingTop: 4,
		paddingBottom: 4,
	},
	infoContainer: {
		flexDirection: 'row',
	},
	text: {
		margin: 2,
		color: '#000',
		fontSize: typography.fontSizes.titleLarge.fontSize,
	},
	container: {
		width: Dimensions.get('window').width * 0.65,
		margin: 4,
	},
	icon: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
	},
	content: {
		...components.containers.results,
	},
	btn: {
		...components.buttons.unstyled.contained,
	},
	dualContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	editButtons: {
		position: 'absolute',
		bottom: 5,
		width: '100%',
	},
});

type OverviewProps = {
	navigation: NativeStackNavigationProp<any>;
	route: RouteProp<ParamListBase, any>;
};

const OverviewPage: FC = (props: OverviewProps) => {
	const { navigation, route } = props;
	const { id, name, duration, energy, power, startDate } = route.params.data;
	return (
		<View style={styles.screenContainer}>
			<Text variant="displayLarge" style={styles.heading}>
				{' '}
				{name}{' '}
			</Text>
			<Card style={styles.cardContainer} mode="elevated">
				<View>
					<Card.Content>
						<View style={{ alignItems: 'center' }}>
							<Text variant="titleLarge">Task Overview</Text>
							<Card style={styles.container} mode="contained">
								<Card.Content style={styles.content}>
									<Avatar.Icon
										size={70}
										icon="clock-outline"
										style={styles.icon}
									/>
									<Text
										style={styles.text}
										variant="bodyMedium"
									>
										cool
									</Text>
								</Card.Content>
							</Card>
						</View>
					</Card.Content>
				</View>
				<View style={styles.infoContainer}>
					<View>
						<OverviewInfoContainer
							icon="lightning-bolt"
							text="Energy"
						/>
						<OverviewInfoContainer
							icon="currency-eur"
							text="Some price"
						/>
					</View>
					<View>
						<OverviewInfoContainer
							icon="power-socket-it"
							text="Power"
						/>
						<OverviewInfoContainer icon="molecule-co2" text="CO2" />
					</View>
				</View>
			</Card>
			<View style={styles.editButtons}>
				<View style={styles.dualContainer}>
					<Button
						style={styles.btn}
						mode="elevated"
						buttonColor="#607d8b"
						textColor="#ffffff"
						onPress={() => navigateBack(navigation)}
					>
						Back
					</Button>
					<Button
						style={styles.btn}
						mode="elevated"
						buttonColor="#4caf50"
						textColor="#ffffff"
						onPress={() =>
							navigateEdit(navigation, route.params.data)
						}
					>
						Edit
					</Button>
				</View>
			</View>
		</View>
	);
};

const navigateEdit = (nav, data) => {
	nav.jumpTo('Edit Task', { data: data });
};
const navigateBack = (nav) => {
	nav.jumpTo('Home');
};

export default OverviewPage;
