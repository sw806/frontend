import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { View, Pressable, StyleSheet, Settings } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';

import { Options } from '../../datatypes/datatypes';
import { components, typography, colors, space } from '../../styles/theme';
import { StorageService } from '../../utils/storage';
import { isValidNumber } from '../../utils/inputValidation';

const SettingsPage: React.FunctionComponent<IStackScreenProps> = (props) => {
	const { navigation, route, nameProp } = props;
	const [isModalVisible, setModalVisible] = useState(false);
	const [maxConsumption, setMaxConsumption] = useState<string>("0");

	const fetchData = async () => {
		const options: Options = await StorageService.getSettings();
		setMaxConsumption(options.max_consumption.toString());
	};

	useEffect(() => {
		fetchData();
	}, []);

	const saveSettigns = async () => {
		const newSettings: Options = {
			max_consumption: parseFloat(maxConsumption),
		};

		await StorageService.saveSettings(newSettings);

		setModalVisible(true)
	};

	const styles = StyleSheet.create({
		screenContainer: {
			...components.containers.screen,
		},
		heading: {
			...typography.pageHeader.big,
		},
		button: {
			alignSelf: 'center',
			...components.buttons.primary.contained,
		},
		containerbutton: {
			...components.buttons.primary.contained,
		},
		disabledButton: {
			...components.buttons.unstyled.contained,
		},
		container: {
			flexDirection: 'row',
			alignSelf: 'center',
		},
		modalBackground: {
			...components.containers.modals.background,
		},
		modalContainer: {
			...components.containers.modals.contained,
		},
	});

	const handleInput = (inputName: string, inputValue: string) => {
		if (isValidNumber(inputValue)) {
			switch (inputName) {
				case 'maxConsumption':
					setMaxConsumption(inputValue);
					break;
			}
			return true;
		} else {
			alert('Invalid input, only numbers allowed!');
			return false;
		}
	};

	return (
		<View style={styles.screenContainer}>
			<View>
				<Text variant="headlineLarge" style={styles.heading}>
					{' '}
					Settings{' '}
				</Text>
			</View>

			<View style={{ marginTop: 20 }}>
				<TextInput
					mode="outlined"
					testID="max_powerconsumption"
					label="Max power consumption (Watt)"
					placeholder="Max power consumption (Watt)"
					onChangeText={(text) => handleInput('maxConsumption', text)}
					value={maxConsumption}
					keyboardType="numeric"
					activeUnderlineColor="#009FFF"
					activeOutlineColor="#009FFF"
					outlineColor="#009FFF"
					underlineColor="#009FFF"
				/>
			</View>


			<View style={styles.container}>
				<Button
					mode="contained"
					style={styles.containerbutton}
					buttonColor={colors.blue.regular}
					onPress={() => navigation.navigate('Home')}
				>
					Back
				</Button>

				<Button
					mode="contained"
					style={styles.disabledButton}
					buttonColor={colors.neutral.grey}
					onPress={() => {
						saveSettigns();
					}}
				>
					Save
				</Button>
			</View>

			<Modal isVisible={isModalVisible}>
				<View style={styles.modalBackground}>
					<View style={styles.modalContainer}>
						<Text style={{ color: '#009FFF', paddingBottom: 10 }}>
							{' '}
							Successfully saved settings!
						</Text>

						<Button
							buttonColor={colors.blue.regular}
							textColor={colors.neutral.white}
							onPress={() => navigation.navigate('Home')}
						>
							Home
						</Button>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default SettingsPage;
