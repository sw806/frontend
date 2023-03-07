import {View, StyleSheet} from "react-native";
import {Button, DataTable, Text} from "react-native-paper";
import * as React from 'react';
import { IStackScreenProps } from "../../library/Stack.ScreenProps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native-gesture-handler";
import {Task} from "../../datatypes/datatypes";

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
      },
    scheduleContainer: {
        flex: 1,
        verticalAlign: "top",
    },
    timeContainer: {
        borderRadius: 20,
        maxHeight: "85%",
        overflow: "hidden",
        marginBottom: "2%",
    },
    timeRow: {
        backgroundColor: "#009FFF"
    },
    timeName: {
        flex: 6,
    },
    timeTime: {
        flex: 6,
    },
    timeArrow: {
        flex: 1,
    },
})

const handleEditTask = (nav, data) => {
    nav.navigate('Edit Task', {data: data})
}

const HomePage: React.FunctionComponent<IStackScreenProps> = props =>  {
    const {navigation, route, nameProp} = props;

    const [minutes, setMinutes] = React.useState("");
    const [energy, setEnergy] = React.useState("");
    const [data, setData] = React.useState<readonly Task[]>([]);

    const getData = async () => {
        try {
          // get saved keys
          const keys = await AsyncStorage.getAllKeys();
          const data = await AsyncStorage.multiGet(keys);

          setData(data.map(d => JSON.parse(d[1])));
        } catch (error) {
          console.log(error);
        }
      };

      getData();

    return(
        <View style={styles.screenContainer}>
            <Text 
                variant="displayLarge"
                style={styles.heading}
                > WattsDown </Text>
            <View style={styles.scheduleContainer}>
                <View style={styles.timeContainer}>
                    <ScrollView>
                    {data.map(d =>
                        <DataTable.Row key={d.id} onPress={() => handleEditTask(navigation, d)} style={styles.timeRow}>
                            <DataTable.Cell style={styles.timeName}>{d.name}</DataTable.Cell>
                            <DataTable.Cell style={styles.timeTime}>{(new Date(d.startDate * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})).replace('.', ':')}</DataTable.Cell>
                            <DataTable.Cell style={styles.timeArrow}>{">"}</DataTable.Cell>
                        </DataTable.Row>
                    )}
                    </ScrollView>
                </View>
                <Button 
                    mode="contained" 
                    onPress={() => navigation.navigate('New Task')}>
                    Add New
                </Button>
            </View>
         
        </View>
    )
}

export default HomePage