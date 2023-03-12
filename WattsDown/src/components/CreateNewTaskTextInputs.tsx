import {TextInput} from "react-native-paper";
import * as React from "react";
import {View} from "react-native";
import { useEffect, useState } from "react";


type TIProps = {
  duration: string,
  energy: string,
  power: string,
  durationDisabled: boolean,
  energyDisabled: boolean,
  powerDisabled: boolean,
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
  energy, 
  power, 
  durationDisabled, 
  energyDisabled, 
  powerDisabled, 
  setDuration, 
  setEnergy, 
  setPower, 
  setDurationDisabled, 
  setEnergyDisabled, 
  setPowerDisabled, 
  setStartDate }: TIProps) => {

  const [activeInput, setActiveInput] = useState<boolean>(false);


  // unlock text inputs 
  useEffect(() => {

    const allInputs = [duration, energy, power];
    const filledInputs = allInputs.filter(Boolean);
    const numFilledInputs = filledInputs.length;

    if(numFilledInputs <= 3 && activeInput){
      
      if(durationDisabled){
        setDuration(null)
        setDurationDisabled(false);

      } 
      if(energyDisabled){
        setEnergy(null)
        setEnergyDisabled(false);


      } 
      if(powerDisabled){
        setPower(null)
        setPowerDisabled(false);
      }
    }

    // clear start date when input is changed
    setStartDate(null);

  }, [duration, energy, power]);

  // handle calculation of third value
  useEffect(() => {

    if (!duration && energy && power && !activeInput){
      const newDuration = ((parseFloat(energy) * 60) / parseFloat(power)).toFixed(4)
      setDuration(newDuration);
      setDurationDisabled(true);

    }
    if (duration && !energy && power && !activeInput){
      const newEnergy = ((parseFloat(duration) / 60) * parseFloat(power)).toFixed(4)
      setEnergy(newEnergy);
      setEnergyDisabled(true);

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
  }, [activeInput]);

  const handleInput = (name: string, value: string) => {
    const regex = /^[\d,.]*$/; // regular expression to allow only digits, commas, and periods

    if (regex.test(value)) {
      switch (name) {
        case 'Duration':
          setDuration(value);
          break;
        case 'Energy':
          setEnergy(value);
          break;
        case 'Power':
          setPower(value);
          break;
      }
    } else {
      alert("Only numbers allowed!");
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
        </View>
    )
}

export default CreateNewTaskInputs