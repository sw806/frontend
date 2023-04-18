import { Avatar, Card, Text } from 'react-native-paper';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { components, typography, colors, space } from '../styles/theme';

const styles = StyleSheet.create({
	content: {
		...components.containers.results,
	},
	mainCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	card: {
		backgroundColor: '#009FFF',
		marginTop: space.spacing.xs,
		borderRadius: 12,
		height: 100,
		width: 148,
		marginRight: 10,
		marginLeft: 10,
	},
	text: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	icon: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
	},
});

type ResultProps = {
	startTime: number;
	price: number;
	loading: boolean;
};
const ResultArea = ({
	startTime,
	price,
	loading,
} : ResultProps) => {

	let startTimeField;
	let priceField;

	const timeOptions = {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		weekday: 'short',
	};

	if (loading) {
		startTimeField = <ActivityIndicator size="large" />;
	} else {
		startTimeField = (
			<View style={styles.content}>
				<Avatar.Icon
					size={50}
					icon="calendar-clock"
					style={styles.icon}
					color='white'
				/>

				<Text style={styles.text}>
					{startTime ? new Date(startTime * 1000).toLocaleString(undefined, timeOptions) : ''}
				</Text>
			</View>
		);

		priceField = (
			<View style={styles.content}>
				<Avatar.Icon
					size={50}
					icon="piggy-bank-outline"
					style={styles.icon}
					color='white'
				/>

				<Text style={styles.text}>
					{price ? price.toFixed(2) + ' Kr.' : ''}
				</Text>
			</View>

		);
	}

	return (
		<View style={styles.mainCard}>

			<View style={styles.card}>
				{startTimeField}
			</View>

			<View style={styles.card}>
				{priceField}
			</View>
			
		</View>
	);
};

export default ResultArea;
