import {View, StyleSheet} from "react-native";
import {Button, Modal, Portal, Provider, Text, TextInput} from "react-native-paper";
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
    },
    modalBackground:{
        flex: 1,
        backgroundColor: 'rba(0,0,0,0,5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer:{
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        elevation: 20,
        borderRadius: 20
    },
    btn: {
        height: 40,
        width: 150,
        margin: 10,
    },
    dualContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20
    }
})



const EditTask:React.FunctionComponent<IStackScreenProps> = props => {
    const {navigation, route, nameProp} = props;
    const [minutes, setMinutes] = React.useState("");
    const [energy, setEnergy] = React.useState("");
    const [watts, setWatts] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [modalText, setModalText] = React.useState("")
    const [saveModal, setSaveModal] = React.useState(false)

    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
    }
    const handleSave = () => {
        setModalText("Are you sure you want to save changes?")
        setSaveModal(true)
        showModal()
    }

    const handleCancel = () => {
        reroute()
    }

    const handleDelete = () => {
        setModalText("Are you sure you want to delete this task?")
        setSaveModal(false)
        showModal()
    }

    const reroute = () => {
        hideModal()
        navigation.navigate('Home')
    }

    const modalCancel = () => {
        hideModal()
    }

    const modalSave = () => {
        reroute()
    }

    const modalDelete = () => {
        reroute()
    }

    const handleSchedule = () => {
        console.log("yes")
    }
    return(
        <View style={styles.container}>
            <View>
                <Text variant="headlineLarge" style={styles.heading} >TASK NAME</Text>
                <Text variant="headlineMedium" style={styles.heading}>Edit Task</Text>
            </View>
            <TextInputs minutes={minutes} energy={energy} watts={watts} setMinutes={setMinutes} setEnergy={setEnergy} setWatts={setWatts} />
            <View style={styles.ScheduleBtn}>
                <Button mode="contained" buttonColor="#009FFF" uppercase onPress={() => handleSchedule()}>Schedule</Button>
            </View>
            <ResultArea time="10:00-12:00" />
            <View style={styles.editButtons}>
                <EditButtons
                    delete={handleDelete}
                    save={handleSave}
                    cancel={handleCancel}
                />
            </View>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle} dismissable={false}>
                <Text variant="bodyMedium">{modalText}</Text>
                <View style={styles.dualContainer}>
                    <Button style={styles.btn} mode="elevated" buttonColor="#607d8b" textColor="#ffffff" onPress={() => modalCancel()} >Cancel</Button>
                    {saveModal &&
                    <Button style={styles.btn} mode="elevated" buttonColor="#4caf50" textColor="#ffffff" onPress={() => modalSave()} >Save</Button>
                    }
                    {!saveModal &&
                    <Button style={styles.btn} mode="elevated" buttonColor="#d32f2f" textColor="#ffffff" onPress={() => modalDelete()}>Delete</Button>
                    }
                </View>
            </Modal>
        </View>
    )
}

export default EditTask