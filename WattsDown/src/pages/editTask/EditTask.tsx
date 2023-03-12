import {View, StyleSheet} from "react-native";
import {Button, Modal, Text} from "react-native-paper";
import * as React from 'react';
import ResultArea from "../../components/ResultArea";
import EditButtons from "../../components/EditButtons";
import {IStackScreenProps} from "../../library/Stack.ScreenProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateNewTaskInputs from "../../components/CreateNewTaskTextInputs";
import { useState } from "react";
import FindStartDateButton from "../../components/FindStartTimeButton";
import {Task} from "../../datatypes/datatypes";


const EditTask:React.FunctionComponent<IStackScreenProps> = props => {
    const {navigation, route, nameProp} = props;
    const {id,name, duration, energy, power, startDate} = route.params.data;

    const url = "INSERT IP HERE"

    const [newDuration, setDuration] = useState<string>((duration).toString());
    const [newEnergy, setEnergy] = useState<string>((energy).toString());
    const [newPower, setPower] = useState<string>((power).toString());
    const [newStartDate, setStartDate] = useState<number>(startDate);
    const [disabledDuration, setDurationDisabled] = useState<boolean>(false);
    const [disabledEnergy, setEnergyDisabled] = useState<boolean>(false);
    const [disabledPower, setPowerDisabled] = useState<boolean>(false);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [modalText, setModalText] = React.useState<string>("")
    const [saveModal, setSaveModal] = React.useState<boolean>(false)
    
    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
    }

    const saveToStorage = async () => {

        const updatedTask: Task  = {
            id: id,
            name: name,
            duration: parseFloat(newDuration),
            power: parseFloat(newPower),
            energy: parseFloat(newEnergy),
            startDate: newStartDate,
        };

        try {
            await AsyncStorage.removeItem(id);
            await AsyncStorage.setItem(id, JSON.stringify(updatedTask));
            
        } catch (error) {
            console.log(error)
        }
    }

    const removeFromStorage = async () => {
        await AsyncStorage.removeItem(id);
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
        saveToStorage().then(() => reroute()).catch(() => console.log("failure"))
    }

    const modalDelete = () => {
        removeFromStorage().then(() => reroute()).catch(() => console.log("couldn't delete"))
    }

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
            position: "relative",
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
    
    return(
        <View style={styles.container}>
            <View>
                <Text variant="headlineLarge" style={styles.heading} >{name}</Text>
            </View>

            <View>
                <Text variant="headlineSmall" style={styles.heading} >Edit</Text>
            </View>

            <CreateNewTaskInputs
                duration={newDuration}
                power={newPower}
                energy={newEnergy}
                durationDisabled={disabledDuration}
                powerDisabled={disabledPower}
                energyDisabled={disabledEnergy}
                screenName={route.name}
                setDuration={setDuration}
                setPower={setPower}
                setEnergy={setEnergy}
                setDurationDisabled={setDurationDisabled}
                setPowerDisabled={setPowerDisabled}
                setEnergyDisabled={setEnergyDisabled}
                setStartDate={setStartDate}
            />

            <FindStartDateButton
                name={name}
                duration={newDuration}
                power={newPower}
                energy={newEnergy}
                url={url}
                startDate={newStartDate}
                setStartDate={setStartDate}
            />

            <ResultArea time={newStartDate} />

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
                    <Button style={styles.btn} mode="elevated" buttonColor="#4caf50" textColor="#ffffff" disabled={!newStartDate} onPress={()  => modalSave()}>Save</Button>
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