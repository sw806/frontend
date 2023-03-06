import React, { useState } from 'react';
import { View, Text, TextInput, Pressable , StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskEnergy, setTaskEnergy] = useState('');
  const [taskPower, setTaskPower] = useState('');
  const [scheduleResult, setScheduleResult] = useState('');

  const handleTaskNameChange = (input: string) => {
    setTaskName(input);
  };
  
  const handleTaskTimeChange = (input: string) => {
    setTaskTime(input);
  };
  
  const handleTaskEnergyChange = (input: string) => {
    setTaskEnergy(input);
  };
  
  const handleTaskPowerChange = (input: string) => {
    setTaskPower(input);
  };

  const handleScheduleResult = () => {

    const body = {
      time: taskTime,
      energy: taskEnergy,
      power: taskPower
    };

    // send form to backend and receive result
    fetch('/api/v1/schedule/',{
      body: JSON.stringify(body),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        setScheduleResult(data);
      })
      .catch((error) => console.log(error));
  };

  const handleCreateTask = async () => {
    const id = uuid.v4().toString();
    const task = {id :uuid.v4(), name: taskName, time: scheduleResult};
    try {
      // check for existing id
      const existingTask = await AsyncStorage.getItem(id);
      if (existingTask !== null) {
        // Generate a new id if the key already exists by calling itself recursively
        handleCreateTask();
        return;
      }
      await AsyncStorage.setItem(id, JSON.stringify(task));

    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    heading:{
      fontSize: 40,
      color: '#009FFF', 
      alignSelf: 'center',
      marginLeft: 'auto',
      marginRight: 'auto', 
      marginTop: 10,
      marginBottom: 20,
    },
    textinput:{
      height: 40, 
      borderColor: '#009FFF', 
      borderWidth: 1, 
      width: 250,
      alignSelf: 'center',
      marginLeft: 'auto',
      marginRight: 'auto', 
      marginTop: 5,
      marginBottom: 5,
    },
    button:{
      height: 30,
      width: 128,
      alignSelf: 'center',
      marginLeft: 'auto',
      marginRight: 'auto', 
      backgroundColor: '#009FFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 30,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    SaveButton:{
      height: 30,
      width: 128,
      alignSelf: 'center',
      marginLeft: 'auto',
      marginRight: 'auto', 
      backgroundColor: '#2EB584',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 30,
    },
    outputArea:{
      width: 320, 
      height: 150, 
      backgroundColor:'#009FFF',
      alignSelf: 'center',
      marginLeft: 'auto',
      marginRight: 'auto', 
      borderRadius: 10,
      marginTop: 30,
      marginBottom: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    
    },
    outputResult:{
      alignSelf: 'center',
      marginLeft: 'auto',
      marginRight: 'auto', 
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: 30,
    }
  })
  
  return (
    <View>
      <Text style= {styles.heading}> 
        New Task
      </Text>

      <TextInput
        style={styles.textinput}
        onChangeText={handleTaskNameChange}
        value={taskName}
        placeholder='Task Name'
      />
      <TextInput
        style={styles.textinput}
        onChangeText={handleTaskTimeChange}
        value={taskTime}
        keyboardType="numeric"
        placeholder='Time Minutes'
      />
      <TextInput
        style={styles.textinput}
        onChangeText={handleTaskEnergyChange}
        value={taskEnergy}
        keyboardType="numeric"
        placeholder='Energy kWh'
      />
      <TextInput
        style={styles.textinput}
        onChangeText={handleTaskPowerChange}
        value={taskPower}
        keyboardType="numeric"
        placeholder='Power Watts'
      />

      <Pressable 
        style={styles.button} 
        onPress={() => {
          setScheduleResult('17:30-18:30')
        }}
      >
        <Text style={{color:'white'}}> Schedule task </Text>
      </Pressable>

      <View style={styles.outputArea}>
        <Text style={styles.outputResult}> {scheduleResult} </Text>
      </View>

      <View style={styles.container}>
        <Pressable style={styles.button}>
          <Text style={{color: 'white'}}> Back </Text>
        </Pressable>

        <Pressable style={styles.SaveButton}>
          <Text style={{ color: 'white'}}> Save </Text>
        </Pressable>
      </View>

    </View>
  );
};

export default CreateTask;
