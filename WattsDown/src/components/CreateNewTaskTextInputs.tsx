import {TextInput} from "react-native-paper";
import * as React from "react";
import {View} from "react-native";
import { useEffect } from "react";


type TIProps = {
  name: string,
  duration: number,
  energy: number,
  power: number,
  durationDisabled: boolean,
  energyDisabled: boolean,
  powerDisabled: boolean,
  setName,
  setDuration,
  setEnergy,
  setPower
  setDurationDisabled,
  setEnergyDisabled,
  setPowerDisabled,
  setStartDate,
}

const CreateNewTaskInputs = ({ name, duration, energy, power, durationDisabled, energyDisabled, powerDisabled, setName, setDuration, setEnergy, setPower, setDurationDisabled, setEnergyDisabled, setPowerDisabled, setStartDate }: TIProps) => {

  useEffect(() => {

    const allInputs = [duration, energy, power];
    const filledInputs = allInputs.filter(Boolean);
    const numFilledInputs = filledInputs.length;

    const allDisabledButtons = [durationDisabled, energyDisabled, powerDisabled]
    const buttonDisabled = allDisabledButtons.filter(Boolean)
    const numDisabled = buttonDisabled.length
    
    if(numFilledInputs == 2 && numDisabled == 1){

      if(durationDisabled){
        setDuration(null)
        setDurationDisabled(false);

      } else if(energyDisabled){
        setEnergy(null)
        setEnergyDisabled(false);


      } else if(powerDisabled){
        setPower(null)
        setPowerDisabled(false);
      }

      setStartDate(null);

    } 
    if (numFilledInputs == 2 && numDisabled == 0) {

      const unfilledInput = allInputs.find((input) => !input);

      if (unfilledInput === duration && energy && power) {
        setDurationDisabled(true);
        const newDuration = (energy * 60) / power
        setDuration(newDuration);

      } else if (unfilledInput === energy && duration && power) {
        setEnergyDisabled(true);

        const newEnergy = (duration / 60) * power
        setEnergy(newEnergy);


      } else if (unfilledInput === power && duration && energy) {

        const newPower = (energy * 60) / duration
        if(newPower > 3){
          alert('Power calculated is too high!');
          return;
        }

        setPower(newPower);
        setPowerDisabled(true);
      }

      setStartDate(null);
    } 
    
  }, [duration, energy, power]);

    return(
        <View style={{marginTop: 20}}>
            <TextInput
            mode="outlined"
            testID="TaskName"
            label="Task Name"
            placeholder="Task Name"
            onChangeText={(text) => setName(text)}
            value={name}
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            />

            <TextInput
            mode="outlined"
            testID="Duration"
            label="Duration (minutes)"
            placeholder="Duration (minutes)"
            onChangeText={(text) => setDuration(text)}
            value={duration ? duration.toString() : ''}
            disabled={durationDisabled}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            />

            <TextInput
            mode="outlined"
            testID="Energy"
            label="Energy (kWh)"
            placeholder="Energy (kWh)"
            onChangeText={(text) => setEnergy(text)}
            value={energy ? energy.toString() : ''}
            disabled={energyDisabled}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            />

            <TextInput
            mode="outlined"
            testID="Power"
            label="Power (kW)"
            placeholder="Power (kW)"
            onChangeText={(text) => setPower(text)}
            value={power ? power.toString() : ''}
            disabled={powerDisabled}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'

            />
        </View>
    )
}

export default CreateNewTaskInputs