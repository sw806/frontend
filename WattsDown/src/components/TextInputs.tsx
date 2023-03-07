import {TextInput} from "react-native-paper";
import * as React from "react";
import {View} from "react-native";

type TIProps = {
    minutes: number,
    energy: number,
    watts: number,
    setMinutes,
    setEnergy,
    setWatts
}

const TextInputs = (props: TIProps) => {
    return(
        <View>
            <TextInput mode="outlined" placeholder="E.g. 60" label="Minutes" value={props.minutes as unknown as string} onChangeText={text => props.setMinutes(text)} activeOutlineColor="#009FFF"/>
            <TextInput mode="outlined" label="Energy" value={(props.energy as unknown as string)} onChangeText={text => props.setEnergy(text)} activeOutlineColor="#009FFF"/>
            <TextInput mode="outlined" label="Watts" value={props.watts as unknown as string} onChangeText={text => props.setWatts(text)} activeOutlineColor="#009FFF"/>

        </View>

    )
}

export default TextInputs