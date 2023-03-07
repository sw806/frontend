import React, { useState } from 'react';
import { View, Pressable , StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Button, Text , TextInput  } from 'react-native-paper';
import { IStackScreenProps } from '../../library/Stack.ScreenProps';
import Modal from "react-native-modal";
import CreateNewTaskInputs from "../../components/CreateNewTaskTextInputs";
import ResultArea from "../../components/ResultArea";

const CreateTask: React.FunctionComponent<IStackScreenProps> = props =>  {

  const {navigation, route, nameProp} = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [scheduleResult, setScheduleResult] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [energy, setEnergy] = useState('');
  const [power, setPower] = useState('');

  /*
  const handleScheduleResult = async () => {

    if (!task.name) {
      alert('Please enter the task name.');
      return false;
    }
    const requiredInputs = ['time', 'energy', 'power'];
    const filledInputs = requiredInputs.filter((input) => !!task[input]);
    if (filledInputs.length < 2) {
      alert('Please provide at least two of the following inputs: Time Minutes, Energy kWh, Power Watts');
      return;
    }
    const body = {
      time: task.time,
      energy: task.energy,
      power: task.power
    };
  
    try {
      const response = await fetch('API_ENDPOINT', {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
      setScheduleResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  */

  // Mock function
  const handleScheduleResult = async () => { 

    if (!name) {
      alert('Please enter the task name.');
      return false;
    }

    // check if at least two of the inputs are provided
    const inputs = [time, energy, power];
    const filledInputs = inputs.filter(input => !!input);
    if (filledInputs.length < 2) {
      alert('Provide 2 of the following inputs: Time Minutes, Energy kWh, Power Watts');
      return;
    }

      setScheduleResult('17:30-18:30')
  };

  const handleCreateTask = async () => {

    const id = uuid.v4().toString();
    const newtask = {
      id: id,
      name: name,
      time: energy,
      energy: energy,
      power: power,
      schedule: scheduleResult
    };
    
    try {
      // check for existing id
      const existingTask = await AsyncStorage.getItem(id);
      if (existingTask !== null) {
        // Generate a new id if the key already exists by calling itself recursively
        handleCreateTask();
        return;
      }
      await AsyncStorage.setItem(id, JSON.stringify(newtask));

      toggleModal();

      // reset states
      setScheduleResult('');

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
      <Text 
      variant="displayLarge"
      style={styles.heading}
      > New Task </Text>

      <CreateNewTaskInputs
        name={name}
        time={time}
        energy={energy}
        power={power}
        setName={setName}
        setTime={setTime}
        setEnergy={setEnergy}
        setPower={setPower}
      />
      
      <Button 
      mode='contained' 
      style={styles.button}
      buttonColor='#009FFF'
      onPress={() => {
        handleScheduleResult();
      }}
      >
        Schedule task
      </Button>

      <ResultArea time={scheduleResult} />

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
          disabled={!scheduleResult}
          onPress={() => {
            handleCreateTask();
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
