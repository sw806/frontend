import {View, StyleSheet} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import * as React from 'react';
import ResultArea from "../../components/ResultArea";
import EditButtons from "../../components/EditButtons";
import TextInputs from "../../components/TextInputs";
import {IStackScreenProps} from "../../library/Stack.ScreenProps";


const styles=StyleSheet.create({
    heading:{
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: "3%",
        color: '#009FFF',
    },
    ScheduleBtn: {
        marginTop: "3%",
        display: "flex",
        alignItems: "center"
    },
    container: {
        flex: 1,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    editButtons: {
        position: "absolute",
        bottom: 5,
        width: "100%"
    }

})



const EditTask:React.FunctionComponent<IStackScreenProps> = props => {
    const {navigation, route, nameProp} = props;
    const [minutes, setMinutes] = React.useState("");
    const [energy, setEnergy] = React.useState("");
    const [watts, setWatts] = React.useState("");
    const handleSave = () => {
        reroute()
    }

    const handleCancel = () => {
        reroute()
    }

    const handleDelete = () => {
        reroute()
    }

    const reroute = () => {
        navigation.navigate('Home')
    }
    return(
        <View style={styles.container}>
            <View>
                <Text variant="headlineLarge" style={styles.heading} >TASK NAME</Text>
                <Text variant="headlineMedium" style={styles.heading}>Edit Task</Text>
            </View>
            <TextInputs minutes={minutes} energy={energy} watts={watts} setMinutes={setMinutes} setEnergy={setEnergy} setWatts={setWatts} />
            <View style={styles.ScheduleBtn}>
                <Button mode="contained" buttonColor="#009FFF" uppercase >Schedule</Button>
            </View>
            <ResultArea time="10:00-12:00" />
            <View style={styles.editButtons}>
                <EditButtons
                    delete={handleDelete}
                    save={handleSave}
                    cancel={handleCancel}
                />
            </View>
        </View>
    )
}

export default EditTask