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
	screenName: string;
	setDuration;
	setEnergy;
	setPower;
	setStartDate;
	previousTaskInUse;
	setPreviousTaskInUse;
};

const CreateNewTaskInputs = ({
	duration,
	power,
	energy,
	setDuration,
	setPower,
	setEnergy,
	screenName,
	setStartDate,
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
			if (newPower > 3) {
				alert('The calculated power ' + newPower + ' is above 3 kW!');
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
	}, [activeInput]);

	const handleInput = (inputName: string, inputValue: string) => {
		if (isValidNumber(inputValue) || inputValue === "") {
			setPreviousTaskInUse(false);
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
				disabled={disabledDuration}
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
				disabled={disabledPower}
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
				disabled={disabledEnergy}
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
