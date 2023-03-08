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
        borderRadius: 10,
        maxHeight: "85%",
        overflow: "hidden",
        marginBottom: "2%",
        borderColor: "#7d34eb",
        borderWidth: 0,
    },
    timeRow: {
        backgroundColor: "#009FFF",
        color: "#FF00FF",
        borderRadius: 10,
        margin: 1,
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
    textFormat: {
        color: "#FFFFFF",
    },
    buttonFormat: {
        color: "#009FFF",
    },
    button:{
        height: 40,
        width: 40,
        borderRadius: 50,
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: '#009FFF',
        color: "#009FFF",
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
                        <DataTable.Row key={d ? d.id : 0} onPress={() => handleEditTask(navigation, d)} style={styles.timeRow}>
                            <DataTable.Cell textStyle={styles.textFormat} style={styles.timeName}>{d ? d.name : 0}</DataTable.Cell>
                            <DataTable.Cell textStyle={styles.textFormat} style={styles.timeTime}>{(new Date((d ? d.startDate : 0) * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})).replace('.', ':')}</DataTable.Cell>
                            <DataTable.Cell textStyle={styles.textFormat} style={styles.timeArrow}>{">"}</DataTable.Cell>
                        </DataTable.Row>
                    )}
                    </ScrollView>
                </View>
                <Button 
                    mode="contained"
                    style={styles.button}
                    buttonColor="#00000000"
                    onPress={() => navigation.navigate('New Task')}>
                    <Text style={styles.buttonFormat}>+</Text>
                </Button>
            </View>
         
        </View>
    )
}

export default HomePage