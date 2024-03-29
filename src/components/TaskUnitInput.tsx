import { TextInput } from 'react-native-paper';
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {FC, useEffect, useState} from 'react';
import {
	calculateDuration,
	calculateEnergy,
	calculatePower,
} from '../utils/calculations';
import { isValidNumber } from '../utils/inputValidation';
import { Options } from '../datatypes/datatypes';
import { StorageService } from '../utils/storage';

type TIProps = {
	duration: string;
	power: string;
	energy: string;
	screenName: string;
	maxTaskConsumption: number,
	setDuration;
	setEnergy;
	setPower;
	setPrice;
	setStartDate;
	setCo2Emission;
	previousTaskInUse;
	setPreviousTaskInUse;
};

const TaskUnitInput = ({
	duration,
	power,
	energy,
	maxTaskConsumption,
	setPrice,
	setDuration,
	setPower,
	setEnergy,
	screenName,
	setStartDate,
	setCo2Emission,
	previousTaskInUse,
	setPreviousTaskInUse,
}: TIProps) => {
	const [activeInput, setActiveInput] = useState<boolean>(false);
	const [disabledDuration, setDurationDisabled] = useState<boolean>(false);
	const [disabledPower, setPowerDisabled] = useState<boolean>(false);
	const [disabledEnergy, setEnergyDisabled] = useState<boolean>(false);

	// unlock text inputs
	useEffect(() => {
		const allInputs = [duration, energy, power];
		const filledInputs = allInputs.filter(Boolean);
		const numFilledInputs = filledInputs.length;

		if (numFilledInputs == 3 && screenName == 'Edit Task') {
			setEnergyDisabled(true);
		}

		if (numFilledInputs == 3 && previousTaskInUse) {
			setEnergyDisabled(true);
			setStartDate(null);
			setCo2Emission(null);
			setPrice(null);
		}

		if (numFilledInputs <= 3 && activeInput) {
			if (disabledDuration) {
				setDuration('');
				setDurationDisabled(false);
			}
			if (disabledPower) {
				setPower('');
				setPowerDisabled(false);
			}
			if (disabledEnergy) {
				setEnergy('');
				setEnergyDisabled(false);
			}

			// clear start date when input is changed
			setStartDate(null);
			setPrice(null);
			setCo2Emission(null)
		}
	}, [duration, energy, power]);

	// handle calculation of third value
	useEffect(() => {
		calculateThridValue()
	}, [activeInput]);

	function calculateThridValue() {
		if (!duration && energy && power && !activeInput) {
			const newDuration = calculateDuration(
				parseFloat(energy),
				parseFloat(power),
				4
			);
			setDuration(newDuration.toString());
			setDurationDisabled(true);
		}

		if (duration && energy && !power && !activeInput) {
			const newPower = calculatePower(
				parseFloat(duration),
				parseFloat(energy),
				4
			);
			if (maxTaskConsumption && newPower > maxTaskConsumption) {
				alert('The calculated power ' + newPower + 'kW is above your max power of ' + maxTaskConsumption + 'kW!');
				return;
			}
			setPower(newPower.toString());
			setPowerDisabled(true);
		}

		if (duration && !energy && power && !activeInput) {
			const newEnergy = calculateEnergy(
				parseFloat(duration),
				parseFloat(power),
				4
			);
			setEnergy(newEnergy.toString());
			setEnergyDisabled(true);
		}
	}

	const handleInput = (inputName: string, inputValue: string) => {
		inputValue = inputValue.replace(',', '.')
		if (isValidNumber(inputValue) || inputValue === '') {
			setPreviousTaskInUse(false);
			switch (inputName) {
				case 'Duration':
					setDuration(inputValue);
					break;
				case 'Power':
					if (maxTaskConsumption && parseFloat(inputValue) > maxTaskConsumption) {
						alert('Power cannot be over ' + maxTaskConsumption + ' kW');
						return;
					}
					setPower(inputValue);
					break;
				case 'Energy':
					setEnergy(inputValue);
					break;
			}
			return true;
		} else {
			alert('Invalid input, only numbers allowed!');
			return false;
		}
	};

	const styles = StyleSheet.create({
		inputfield: {
			backgroundColor: 'white',
			height: 40,
			width: '100%',
		},
		inputView: {
			marginTop: 10,
		},
		textInputContainer: {
			marginBottom: 5,
		  },
	});
	return (
		<View style={styles.inputView}>
			<View style={styles.textInputContainer}>
				<TextInput
					mode="outlined"
					testID="Duration"
					label={
						<>
						  <Text>Duration (minutes)</Text>
						  <Text style={{ color: 'red' }}>*</Text>
						</>
					  }
					placeholder="Duration (minutes)"
					onChangeText={(text) => handleInput('Duration', text)}
					value={duration}
					disabled={disabledDuration}
					keyboardType="numeric"
					activeUnderlineColor="#009FFF"
					activeOutlineColor="#009FFF"
					outlineColor="#009FFF"
					underlineColor="#009FFF"
					onFocus={() => setActiveInput(true)}
					onBlur={() => setActiveInput(false)}
					style={styles.inputfield}
				/>
			</View>

			<View style={styles.textInputContainer}>
				<TextInput
					mode="outlined"
					testID="Power"
					label={
						<>
						  <Text>Power (kW)</Text>
						  <Text style={{ color: 'red' }}>*</Text>
						</>
					  }
					placeholder="Power (kW)"
					onChangeText={(text) => handleInput('Power', text)}
					value={power}
					disabled={disabledPower}
					keyboardType="numeric"
					activeUnderlineColor="#009FFF"
					activeOutlineColor="#009FFF"
					outlineColor="#009FFF"
					underlineColor="#009FFF"
					onFocus={() => setActiveInput(true)}
					onBlur={() => setActiveInput(false)}
					style={styles.inputfield}
				/>
			</View>

			<View style={styles.textInputContainer}>
				<TextInput
					mode="outlined"
					testID="Energy"
					label={
						<>
						  <Text>Energy (kWh)</Text>
						  <Text style={{ color: 'red' }}>*</Text>
						</>
					  }
					placeholder="Energy (kWh)"
					onChangeText={(text) => handleInput('Energy', text)}
					value={energy}
					disabled={disabledEnergy}
					keyboardType="numeric"
					activeUnderlineColor="#009FFF"
					activeOutlineColor="#009FFF"
					outlineColor="#009FFF"
					underlineColor="#009FFF"
					onFocus={() => setActiveInput(true)}
					onBlur={() => setActiveInput(false)}
					style={styles.inputfield}
				/>
			</View>
		</View>
	);
};

export default TaskUnitInput;
