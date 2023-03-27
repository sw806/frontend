import React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import { components, typography } from '../styles/theme';

type InfoProps = {
	icon: string;
	text: string;
};

const styles = StyleSheet.create({
	text: {
		...typography.regularText.medBlack,
	},
	container: {
		width: Dimensions.get('window').width * 0.35,
		margin: 4,
	},
	icon: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
	},
	content: {
		...components.containers.results,
	},
});

const OverviewInfoContainer = (props: InfoProps) => {
	return (
		<Card style={styles.container} mode="contained">
			<Card.Content style={styles.content}>
				<Avatar.Icon size={40} icon={props.icon} style={styles.icon} />
				<Text style={styles.text} variant="bodyMedium">
					{props.text}
				</Text>
			</Card.Content>
		</Card>
	);
};

export default OverviewInfoContainer;
