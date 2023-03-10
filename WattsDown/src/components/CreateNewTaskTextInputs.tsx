import {TextInput} from "react-native-paper";
import * as React from "react";
import {View} from "react-native";


type TIProps = {
  name: string,
  duration: string,
  energy: string,
  power: string,
  durationDisabled: boolean,
  energyDisabled: boolean,
  powerDisabled: boolean,
  inputsFilled: number,
  setName,
  setDuration,
  setEnergy,
  setPower
  setdurationDisabled,
  setEnergyDisabled,
  setPowerDisabled,
  
}

const CreateNewTaskInputs = (props: TIProps) => {

    
    const handleInputChange = (name: string, value: string) => {
        switch (name) {
          case 'name':
            props.setName(value);
            break;
          case 'duration':
            props.setDuration(value);
            break;
          case 'energy':
            props.setEnergy(value);
            break;
          case 'power':
            props.setPower(value);
            break;
        }
      }

    return(
        <View style={{marginTop: 20}}>
            <TextInput
            mode="outlined"
            testID="TaskName"
            label="Task Name"
            placeholder="Task Name"
            onChangeText={(text) => handleInputChange('name', text)}
            value={props.name}
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
            onChangeText={(text) => handleInputChange('duration', text)}
            value={props.duration}
            disabled={props.durationDisabled}
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
            onChangeText={(text) => handleInputChange('energy', text)}
            value={props.energy}
            disabled={props.energyDisabled}
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
            onChangeText={(text) => handleInputChange('power', text)}
            value={props.power}
            disabled={props.powerDisabled}
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