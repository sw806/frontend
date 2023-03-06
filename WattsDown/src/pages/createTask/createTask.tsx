import React, { useState } from 'react';
import { View, Pressable , StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Button, Text , TextInput  } from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const CreateTask = () => {
  const [scheduleResult, setScheduleResult] = useState('');
  const [task, setTask] = useState({
    name: '',
    time: '',
    energy: '',
    power: ''
  });
  
  const handleInputChange = (name, value) => {
    setTask(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleScheduleResult = async () => {
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
  

  const handleCreateTask = async () => {
    const id = uuid.v4().toString();
    const task = {id :uuid.v4(), setScheduleResult, time: scheduleResult};
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
    outputArea:{
      width: '90%', 
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
      fontSize: 30,
    },
  })
  
  return (
    <View>
      <Text 
      variant="displayLarge"
      style={styles.heading}
      > New Task </Text>

      <TextInput
      mode="outlined"
      label="Task Name"
      placeholder="Enter the task name"
      right={<TextInput.Affix text="/100" />}
      onChangeText={text => handleInputChange('name', text)}
      value={task.name}
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
      onChangeText={text => handleInputChange('time', text)}
      value={task.time}
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
      onChangeText={text => handleInputChange('energy', text)}
      value={task.energy}
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
      onChangeText={text => handleInputChange('power', text)}
      value={task.power}
      keyboardType="numeric"
      activeUnderlineColor='#009FFF'
      activeOutlineColor='#009FFF'
      outlineColor='#009FFF'
      underlineColor='#009FFF'
      />

      <Button 
      mode='contained' 
      style={styles.button}
      buttonColor='#009FFF'
      onPress={() => {
        setScheduleResult('17:30-18:30')
      }}
      >
        Schedule task
      </Button>

      <View style={styles.outputArea}>
        <Text style={styles.outputResult}> {scheduleResult} </Text>
      </View>

      <View style={styles.container}>

        <Button 
          mode='contained' 
          style={styles.containerbutton}
          buttonColor='#009FFF'
          onPress={() => {
            setScheduleResult('17:30-18:30')
          }}
          >
            Back
        </Button>

        <Button 
          mode='contained' 
          style={styles.containerbutton}
          buttonColor='#2EB584'
          onPress={() => {
            setScheduleResult('17:30-18:30')
          }}
          >
            Save
        </Button>

      </View>

    </View>
  );
};

export default CreateTask;
