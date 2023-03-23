import { TextInput } from 'react-native-paper';
import * as React from 'react';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import {
	calculateDuration,
	calculateEnergy,
	calculatePower,
} from '../utils/calculations';
import { isValidNumber } from '../utils/inputValidation';

type TIProps = {
	duration: string;
	power: string;
	energy: string;
	durationDisabled: boolean;
	energyDisabled: boolean;
	powerDisabled: boolean;
	screenName: string;
	setDuration;
	setEnergy;
	setPower;
	setDurationDisabled;
	setEnergyDisabled;
	setPowerDisabled;
	setStartDate;
};

const CreateNewTaskInputs = ({
	duration,
	power,
	energy,
	durationDisabled,
	energyDisabled,
	powerDisabled,
	setDuration,
	setPower,
	setEnergy,
	setDurationDisabled,
	setPowerDisabled,
	setEnergyDisabled,
	screenName,
	setStartDate,
}: TIProps) => {
	const [activeInput, setActiveInput] = useState<boolean>(false);

	// unlock text inputs
	useEffect(() => {
		const allInputs = [duration, energy, power];
		const filledInputs = allInputs.filter(Boolean);
		const numFilledInputs = filledInputs.length;

		if (numFilledInputs == 3 && screenName == 'Edit Task') {
			setEnergyDisabled(true);
		}

		if (numFilledInputs <= 3 && activeInput) {
			if (durationDisabled) {
				setDuration(undefined);
				setDurationDisabled(false);
			}
			if (powerDisabled) {
				setPower(undefined);
				setPowerDisabled(false);
			}
			if (energyDisabled) {
				setEnergy(undefined);
				setEnergyDisabled(false);
			}

			// clear start date when input is changed
			setStartDate(null);
		}
	}, [duration, energy, power]);

	// handle calculation of third value
	useEffect(() => {
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
	}, [activeInput]);

	const handleInput = (inputName: string, inputValue: string) => {
		if (isValidNumber(inputValue)) {
			switch (inputName) {
				case 'Duration':
					setDuration(inputValue);
					break;
				case 'Power':
					if (parseFloat(inputValue) > 3) {
						alert('Power cannot be over 3');
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
	return (
		<View style={{ marginTop: 20 }}>
			<TextInput
				mode="outlined"
				testID="Duration"
				label="Duration (minutes)"
				placeholder="Duration (minutes)"
				onChangeText={(text) => handleInput('Duration', text)}
				value={duration}
				disabled={durationDisabled}
				keyboardType="numeric"
				activeUnderlineColor="#009FFF"
				activeOutlineColor="#009FFF"
				outlineColor="#009FFF"
				underlineColor="#009FFF"
				onFocus={() => setActiveInput(true)}
				onBlur={() => setActiveInput(false)}
			/>

			<TextInput
				mode="outlined"
				testID="Power"
				label="Power (kW)"
				placeholder="Power (kW)"
				onChangeText={(text) => handleInput('Power', text)}
				value={power}
				disabled={powerDisabled}
				keyboardType="numeric"
				activeUnderlineColor="#009FFF"
				activeOutlineColor="#009FFF"
				outlineColor="#009FFF"
				underlineColor="#009FFF"
				onFocus={() => setActiveInput(true)}
				onBlur={() => setActiveInput(false)}
			/>

			<TextInput
				mode="outlined"
				testID="Energy"
				label="Energy (kWh)"
				placeholder="Energy (kWh)"
				onChangeText={(text) => handleInput('Energy', text)}
				value={energy}
				disabled={energyDisabled}
				keyboardType="numeric"
				activeUnderlineColor="#009FFF"
				activeOutlineColor="#009FFF"
				outlineColor="#009FFF"
				underlineColor="#009FFF"
				onFocus={() => setActiveInput(true)}
				onBlur={() => setActiveInput(false)}
			/>
		</View>
	);
};

export default CreateNewTaskInputs;
