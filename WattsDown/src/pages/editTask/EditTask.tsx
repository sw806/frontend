import {View, StyleSheet} from "react-native";
import {Text, TextInput} from "react-native-paper";
import * as React from 'react';

const styles=StyleSheet.create({
    heading:{
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    }
})

export default function EditTask() {
    const [minutes, setMinutes] = React.useState("");
    const [energy, setEnergy] = React.useState("");
    const [watts, setWatts] = React.useState("");
    return(
        <View>
            <Text variant="headlineLarge" style={styles.heading} >TASK NAME</Text>
            <Text variant="headlineLarge" style={styles.heading}>Edit Task</Text>
            <TextInput label="Minutes" value={minutes} onChangeText={text => setMinutes(text)}/>
        </View>
    )
}