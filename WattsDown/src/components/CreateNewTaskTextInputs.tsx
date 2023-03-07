import {TextInput} from "react-native-paper";
import * as React from "react";
import {View} from "react-native";


type TIProps = {
  name: string,
  time: string,
  energy: string,
  power: string,
  setName,
  setTime,
  setEnergy,
  setPower
}

const CreateNewTaskInputs = (props: TIProps) => {

    return(
        <View>
            <TextInput
            mode="outlined"
            label="Task Name"
            placeholder="Enter the task name"
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
            label="Time Minutes"
            placeholder="Enter the task name"
            right={<TextInput.Affix text="/100" />}
            onChangeText={text => props.setTime(text)}
            value={props.time}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            />

            <TextInput
            mode="outlined"
            label="Energy kWh"
            placeholder="Enter the task name"
            right={<TextInput.Affix text="/100" />}
            onChangeText={text => props.setEnergy(text)}
            value={props.energy}
            keyboardType="numeric"
            activeUnderlineColor='#009FFF'
            activeOutlineColor='#009FFF'
            outlineColor='#009FFF'
            underlineColor='#009FFF'
            />

            <TextInput
            mode="outlined"
            label="Power Watts"
            placeholder="Enter the task name"
            right={<TextInput.Affix text="/100" />}
            onChangeText={text => props.setPower(text)}
            value={props.power}
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