import React, { useEffect, useState } from 'react';
import { View, Pressable , StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Button, Text , TextInput  } from 'react-native-paper';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import Modal from "react-native-modal";
import CreateNewTaskInputs from "../../components/CreateNewTaskTextInputs";
import ResultArea from "../../components/ResultArea";
import {Task} from "../../datatypes/datatypes";
import FindStartDateButton from '../../components/FindStartTimeButton';

const url = "INSERT IP HERE"

const CreateTask: React.FunctionComponent<IStackScreenProps> = props =>  {

  const {navigation, route, nameProp} = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<string>();
  const [power, setPower] = useState<string>();
  const [energy, setEnergy] = useState<string>();
  const [startDate, setStartDate] = useState<number>();
  const [disabledDuration, setDurationDisabled] = useState<boolean>(false);
  const [disabledPower, setPowerDisabled] = useState<boolean>(false);
  const [disabledEnergy, setEnergyDisabled] = useState<boolean>(false);

  const saveTask = async () => {

    const newTask: Task = {
      id: uuid.v4().toString(),
      name: name,
      duration: parseFloat(duration),
      power: parseFloat(power),
      energy: parseFloat(energy),
      startDate: startDate,
    };
  
    try {
      
      // check for existing id
      const existingTask = await AsyncStorage.getItem(newTask.id);
      if (existingTask !== null) {
        // Generate a new id if the key already exists by calling itself recursively
        saveTask();
        return;
      }
      await AsyncStorage.setItem(newTask.id, JSON.stringify(newTask));

      toggleModal();

    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    heading:{
      color: '#009FFF', 
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    button:{
      height: 40,
      width: 150,
      margin: 10,
      alignSelf: 'center',
    },
    containerbutton:{
      height: 40,
      width: 150,
      margin: 10,
    },
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    modalBackground:{
      flex: 1,
      backgroundColor: 'rba(0,0,0,0,5',
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
    }
  })
  
  return (
    <View style={styles.screenContainer}>
      <View>
          <Text variant="headlineLarge" style={styles.heading} > Create Task </Text>
      </View>

      <TextInput
        mode="outlined"
        testID="TaskName"
        label="Task Name"
        placeholder="Task Name"
        onChangeText={(text) => setName(text)}
        value={name}
        keyboardType="numeric"
        activeUnderlineColor='#009FFF'
        activeOutlineColor='#009FFF'
        outlineColor='#009FFF'
        underlineColor='#009FFF'
      />

      <CreateNewTaskInputs
        duration={duration}
        power={power}
        energy={energy}
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
      duration={duration}
      power={power}
      energy={energy}
      url={url}
      startDate={startDate}
      setStartDate={setStartDate}
      />

      <ResultArea time={startDate} />

      <View style={styles.container}>

        <Button 
          mode='contained' 
          style={styles.containerbutton}
          buttonColor='#009FFF'
          onPress={() => navigation.navigate('Home')}
          >
            Back
        </Button>

        <Button 
          mode='contained' 
          style={styles.containerbutton}
          buttonColor='#2EB584'
          disabled={!startDate}
          onPress={() => {
            saveTask();
          }}
          >
            Save
        </Button>

      </View>

      <Modal isVisible={isModalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={{color: '#009FFF', paddingBottom: 10}}> {name} scheduled!</Text>

              <Button  
                  buttonColor='#009FFF'
                  textColor='white'
                  onPress={() => navigation.navigate('Home')}>
                    Home
              </Button>

            </View>
          </View>
        </Modal>
    </View>
  );
};

export default CreateTask;
