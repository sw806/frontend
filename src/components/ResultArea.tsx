import { Avatar, Card, Text } from 'react-native-paper';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { components, typography, colors, space } from '../styles/theme';

const styles = StyleSheet.create({
	content: {
		...components.containers.results,
	},
	card: {
		backgroundColor: colors.blue.regular,
		marginTop: space.spacing.xs,
	},
	text: {
		fontSize: typography.fontSizes.titleLarge.fontSize,
	},
	icon: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
	},
});

type ResultProps = {
	time: number;
	loading: boolean;
};
const ResultArea = (props: ResultProps) => {
	const date = new Date(props.time * 1000); // Convert Unix timestamp to Date object
	const formattedDate = date.toLocaleString(); // Format the date to a string
	let infoField;

	if (props.loading) {
		infoField = <ActivityIndicator size="large" />
	} else {
		infoField = <View style={styles.content}><Avatar.Icon
		size={70}
		icon="clock-outline"
		style={styles.icon}
	/>
	<Text style={styles.text}>
		{props.time ? formattedDate : props.time}
	</Text></View>
	}

	return (
		<Card style={styles.card}>
			<Card.Content style={styles.content}>
				{infoField}
			</Card.Content>
		</Card>
	);
};

export default ResultArea;
