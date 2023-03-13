import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { components, typography, colors, space } from '../styles/theme';

const styles = StyleSheet.create({
	btn: {
		...components.buttons.unstyled.contained,
	},
	dualContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	singleContainer: {
		marginTop: space.spacing.xs,
		...components.containers.button.single,
	},
	container: {
		width: '80%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: space.spacing.s,
	},
});
const EditButtons = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.dualContainer}>
				<Button
					style={styles.btn}
					mode="elevated"
					buttonColor="#607d8b"
					textColor="#ffffff"
					onPress={() => props.cancel()}
				>
					Cancel
				</Button>
				<Button
					style={styles.btn}
					mode="elevated"
					buttonColor="#4caf50"
					textColor="#ffffff"
					onPress={() => props.save()}
				>
					Save
				</Button>
			</View>
			<View style={styles.singleContainer}>
				<Button
					style={styles.btn}
					mode="elevated"
					buttonColor="#d32f2f"
					textColor="#ffffff"
					onPress={() => props.delete()}
				>
					Delete
				</Button>
			</View>
		</View>
	);
};

export default EditButtons;
