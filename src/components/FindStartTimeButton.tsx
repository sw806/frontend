import {Button, Text} from "react-native-paper";
import * as React from "react";
import {View} from "react-native";
import { useEffect, useState } from "react";
import {SERVER_IP} from '@env'


type TIProps = {
  name: string,
  duration: string,
  energy: string,
  power: string,
  url: string,
  startDate: number,
  setStartDate,
}

const FindStartDateButton = ({ 
  name,
  duration, 
  energy, 
  power, 
  url,
  setStartDate,
}: TIProps) => {

  const findStartDate = async () => {

      if (!name) {
        alert('Please enter the task name.');
        return;
      }
  
      const inputs = [duration, energy, power];
      const filledInputs = inputs.filter(input => !!input);

      if (inputs.some(input => input === '' || input === null) || filledInputs.length < 2) {
        alert('Provide 2 of the following inputs: Duration, Energy kWh, Power Watts');
        return;
      }

  
      if(parseFloat(power) > 3){
        alert('Power is too high');
        return;
      }
  
      fetch(process.env.SERVER_IP + "/api/v1/schedules", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            duration: 1,
            power: 101
        }),
        })
        .then((response) => response.json())
        .then((responseData) => {
          setStartDate(responseData.start_date);
        }
        )
        .catch(() => setStartDate(123123123));
    };
  return(
    <View>
      <Button 
        mode='contained' 
        style={{
          height: 40,
          width: 150,
          margin: 10,
          alignSelf: 'center',
          }}
        buttonColor='#009FFF'
        onPress={() => {
          findStartDate();
        }}
        >
          Find start time
      </Button>

    </View>
  )
}
  
export default FindStartDateButton
