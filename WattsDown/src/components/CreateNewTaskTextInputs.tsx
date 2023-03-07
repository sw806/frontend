import {TextInput} from "react-native-paper";
import * as React from "react";
import {View} from "react-native";


type TIProps = {
  name: string,
  duration: number,
  energy: number,
  power: number,
  setName,
  setDuration,
  setEnergy,
  setPower
}

const CreateNewTaskInputs = (props: TIProps) => {

    return(
        <View>
            <TextInput
            mode="outlined"
            label="Task Name"
            placeholder="Task Name"
            right={<TextInput.Affix text="/100" />}
            onChangeText={text => props.setName(text)}
            value={props.name}
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            />

            <TextInput
            mode="outlined"
            label="Duration"
            placeholder="Duration"
            right={<TextInput.Affix text="/100" />}
            onChangeText={text => props.setDuration(text)}
            value={props.duration != null ? props.duration.toString() : ''}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            />

            <TextInput
            mode="outlined"
            label="Energy kWh"
            placeholder="Energy kWh"
            right={<TextInput.Affix text="/100" />}
            onChangeText={text => props.setEnergy(text)}
            value={props.energy != null ? props.energy.toString() : ''}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            />

            <TextInput
            mode="outlined"
            label="Power kW"
            placeholder="Power kW"
            right={<TextInput.Affix text="/100" />}
            onChangeText={text => props.setPower(text)}
            value={props.power != null ? props.power.toString() : ''}
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