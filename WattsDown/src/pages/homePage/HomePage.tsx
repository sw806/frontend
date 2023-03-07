import {View, StyleSheet, ScrollView} from "react-native";
import {Button, DataTable, Divider, Menu, Text, TextInput} from "react-native-paper";
import * as React from 'react';
import { IStackScreenProps } from "../../library/Stack.ScreenProps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuItem from "react-native-paper/lib/typescript/components/Menu/MenuItem";

const styles=StyleSheet.create({
    screenContainer: {
        flex: 1,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: 'center',
      },
    heading:{
        color: '#009FFF', 
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
      }
})

const handleEditTask = (nav) => {
    nav.navigate('Edit Task')
}

const HomePage: React.FunctionComponent<IStackScreenProps> = props =>  {
    const {navigation, route, nameProp} = props;

    const [minutes, setMinutes] = React.useState("");
    const [energy, setEnergy] = React.useState("");
    const [data, setData] = React.useState<readonly any[]>([]);

    const getData = async () => {
        try {
          // get saved keys
          const keys = await AsyncStorage.getAllKeys();
          const data = await AsyncStorage.multiGet(keys);

          setData(data);
        } catch (error) {
          console.log(error);
        }

        return [];
      };

      getData();

    return(
        <View style={styles.screenContainer}>
            <Text 
                variant="displayLarge"
                style={styles.heading}
                > WattsDown </Text>
            <View>
                {data.map(d =>
                    <DataTable.Row onPress={() => handleEditTask(navigation)}>
                        <DataTable.Cell>{JSON.parse(d[1]).name}</DataTable.Cell>
                        <DataTable.Cell>{JSON.parse(d[1]).schedule}</DataTable.Cell>
                        <DataTable.Cell>{">"}</DataTable.Cell>
                    </DataTable.Row>
                )}
            </View>
            <Button 
                mode="contained" 
                onPress={() => navigation.navigate('New Task')}>
                Add New
            </Button>
         
        </View>
    )
}

export default HomePage