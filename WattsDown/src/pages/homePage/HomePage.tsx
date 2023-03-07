import {View, StyleSheet} from "react-native";
import {Button, DataTable, Text} from "react-native-paper";
import * as React from 'react';
import { IStackScreenProps } from "../../library/Stack.ScreenProps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native-gesture-handler";

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
        width: "80%",
        verticalAlign: "top",
        marginLeft: "auto",
        marginRight: "auto",
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
        flex: 7,
    },
    timeTime: {
        flex: 7,
    },
    timeArrow: {
        flex: 1,
    },
})

const handleEditTask = (nav, data) => {
    nav.navigate('Edit Task', {data: JSON.parse(data)})
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
                        <DataTable.Row key={JSON.parse(d[1]).id} onPress={() => handleEditTask(navigation, d[1])} style={styles.timeRow}>
                            <DataTable.Cell style={styles.timeName}>{JSON.parse(d[1]).name}</DataTable.Cell>
                            <DataTable.Cell style={styles.timeTime}>{JSON.parse(d[1]).schedule}</DataTable.Cell>
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