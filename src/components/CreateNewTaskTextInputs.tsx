import {TextInput} from "react-native-paper";
import * as React from "react";
import {View} from "react-native";
import { useEffect, useState } from "react";

type TIProps = {
  duration: string,
  power: string,
  energy: string,
  durationDisabled: boolean,
  energyDisabled: boolean,
  powerDisabled: boolean,
  screenName: string,
  setDuration,
  setEnergy,
  setPower
  setDurationDisabled,
  setEnergyDisabled,
  setPowerDisabled,
  setStartDate,
}

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
  setStartDate }: TIProps) => {

  const [activeInput, setActiveInput] = useState<boolean>(false);

  // unlock text inputs 
  useEffect(() => {

    const allInputs = [duration, energy, power];
    const filledInputs = allInputs.filter(Boolean);
    const numFilledInputs = filledInputs.length;

    if(numFilledInputs == 3 && screenName == 'Edit Task'){
      setEnergyDisabled(true);
    }

    if(numFilledInputs <= 3 && activeInput){

      if(durationDisabled){
        setDuration(undefined)
        setDurationDisabled(false);
      } 
      if(powerDisabled){
        setPower(undefined)
        setPowerDisabled(false);
      }
      if(energyDisabled){
        setEnergy(undefined)
        setEnergyDisabled(false);
      } 

      // clear start date when input is changed
      setStartDate(null);
    }
  }, [duration, energy, power]);

  // handle calculation of third value
  useEffect(() => {

    if (!duration && energy && power && !activeInput){
      const newDuration = ((parseFloat(energy) * 60) / parseFloat(power)).toFixed(4)
      setDuration(newDuration);
      setDurationDisabled(true);
    }

    if (duration && energy && !power && !activeInput){
      const newPower = ((parseFloat(energy) * 60) / parseFloat(duration)).toFixed(4)
      setPower(newPower);
      setPowerDisabled(true);   

      if(parseFloat(newPower) > 3) {
        alert('Power calculated is too high!');
        return;
      }
    }

    if (duration && !energy && power && !activeInput){
      const newEnergy = ((parseFloat(duration) / 60) * parseFloat(power)).toFixed(4)
      setEnergy(newEnergy);
      setEnergyDisabled(true);
    }
  }, [activeInput]);

  const handleInput = (name: string, value: string) => {
    const regex = /^\d*\.?\d*$/;

    if (regex.test(value)) {
      switch (name) {
        case 'Duration':
          setDuration(value);
          break;
        case 'Power':
          setPower(value);
          break;
        case 'Energy':
          setEnergy(value);
          break;
      }
    } else {
      alert("Invalid input, only numbers allowed!");
      return;
    }
  }
    return(
        <View style={{marginTop: 20}}>
            <TextInput
            mode="outlined"
            testID="Duration"
            label="Duration (minutes)"
            placeholder="Duration (minutes)"
            onChangeText={(text) => handleInput('Duration',text)}
            value={duration}
            disabled={durationDisabled}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            onFocus={() => setActiveInput(true)}
            onBlur={() => setActiveInput(false)}
            />

            <TextInput
            mode="outlined"
            testID="Power"
            label="Power (kW)"
            placeholder="Power (kW)"
            onChangeText={(text) => handleInput('Power',text)}
            value={power}
            disabled={powerDisabled}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            onFocus={() => setActiveInput(true)}
            onBlur={() => setActiveInput(false)}
            />

            <TextInput
            mode="outlined"
            testID="Energy"
            label="Energy (kWh)"
            placeholder="Energy (kWh)"
            onChangeText={(text) => handleInput('Energy',text)}
            value={energy}
            disabled={energyDisabled}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            onFocus={() => setActiveInput(true)}
            onBlur={() => setActiveInput(false)}
            />

        </View>
    )
}

export default CreateNewTaskInputs