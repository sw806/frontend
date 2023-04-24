import { Avatar, Card, Text } from 'react-native-paper';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { components, typography, colors, space } from '../styles/theme';

const styles = StyleSheet.create({
	content: {
		...components.containers.results,
	},
	mainCard: {
		alignItems: 'center',
	},
	containterCard:{
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	card: {
		backgroundColor: '#009FFF',
		marginTop: space.spacing.xs,
		borderRadius: 12,
		height: 70,
		width: 148,
		alignItems: 'center',
		marginRight: 10,
		marginLeft: 10,
	},
	cardLong: {
		backgroundColor: '#009FFF',
		marginTop: space.spacing.xs,
		borderRadius: 12,
		height: 70,
		width: 315,
		marginRight: 10,
		marginLeft: 10,
	},
	text: {
		fontSize: 18,
		color: 'white',
		fontWeight: 'bold',
	},
	icon: {
		backgroundColor: 'transparent',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	} 
});

type ResultProps = {
	startTime: number;
	price: number;
	loading: boolean;
	co2Emission: number;
};
const ResultArea = ({
	startTime,
	price,
	co2Emission,
	loading,
} : ResultProps) => {

	let startTimeField;
	let priceField;
	let co2Field;

	const timeOptions = {
		hour12: false,
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		hour: '2-digit',
		minute: '2-digit',
	};

	if (loading) {
		startTimeField = (
			<View style={styles.loadingContainer}>
			  <ActivityIndicator size="large" color="white"/>
			</View>
		  );
		  priceField = (
			<View style={styles.loadingContainer}>
			  <ActivityIndicator size="large" color="white" />
			</View>
		  );

		  co2Field = (
			<View style={styles.loadingContainer}>
			  <ActivityIndicator size="large" color="white" />
			</View>
		  );
	} else {
		startTimeField = (
			<View style={styles.content}>
				<Avatar.Icon
					size={40}
					icon="calendar-clock"
					style={styles.icon}
					color='white'
				/>

				<Text style={styles.text}>
					{startTime ? new Date(startTime * 1000).toLocaleString('en-GB', timeOptions) : ''}
				</Text>
			</View>
		);

		priceField = (
			<View style={styles.content}>
				<Avatar.Icon
					size={40}
					icon="piggy-bank-outline"
					style={styles.icon}
					color='white'
				/>

				<Text style={styles.text}>
					{price ? price.toFixed(2) + ' Kr.' : ''}
				</Text>
			</View>

		);

		co2Field = (
			<View style={styles.content}>
				<Avatar.Icon
					size={40}
					icon="molecule-co2"
					style={styles.icon}
					color='white'
				/>
				<Text style={styles.text}>
					{co2Emission ? co2Emission.toFixed(2) + ' g/kWh\n' : ""}
				</Text>


			</View>

		);
	}

	return (
		<View style={styles.mainCard}>

			<View style={styles.cardLong}>
				{startTimeField}
			</View>

			<View style={styles.containterCard}>
				<View style={styles.card}>
					{co2Field}
				</View>

				<View style={styles.card}>
					{priceField}
				</View>
			</View>
			
		</View>
	);
};

export default ResultArea;
