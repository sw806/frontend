import {View, StyleSheet} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import * as React from 'react';
import ResultArea from "../../components/ResultArea";
import EditButtons from "../../components/EditButtons";
import TextInputs from "../../components/TextInputs";


const styles=StyleSheet.create({
    heading:{
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    ScheduleBtn: {
        marginTop: "1%"
    }
})

export default function EditTask() {
    const [minutes, setMinutes] = React.useState("");
    const [energy, setEnergy] = React.useState("");
    const [watts, setWatts] = React.useState("");
    return(
        <View>
            <View>
                <Text variant="headlineLarge" style={styles.heading} >TASK NAME</Text>
                <Text variant="headlineLarge" style={styles.heading}>Edit Task</Text>
            </View>
            <TextInputs minutes={minutes} energy={energy} watts={watts} setMinutes={setMinutes} setEnergy={setEnergy} setWatts={setWatts} />
            <Button mode="contained" buttonColor="#009FFF" uppercase style={styles.ScheduleBtn} >Schedule</Button>
            <ResultArea time="10:00-12:00" />
            <EditButtons />
        </View>
    )
}