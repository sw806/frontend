import {View, StyleSheet, ScrollView} from "react-native";
import {Button, DataTable, Divider, Menu, Text, TextInput} from "react-native-paper";
import * as React from 'react';
import MenuItem from "react-native-paper/lib/typescript/components/Menu/MenuItem";
import { IStackScreenProps } from "../../library/Stack.ScreenProps";

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

const HomePage: React.FunctionComponent<IStackScreenProps> = props =>  {
    const {navigation, route, nameProp} = props;

    const [minutes, setMinutes] = React.useState("");
    const [energy, setEnergy] = React.useState("");
    const [watts, setWatts] = React.useState("");
    return(
        <View style={styles.screenContainer}>
            <Text 
                variant="displayLarge"
                style={styles.heading}
                > WattsDown </Text>
            <View>
                <DataTable.Row>
                    <DataTable.Cell>Wash Clothes</DataTable.Cell>
                    <DataTable.Cell>17:30</DataTable.Cell>
                    <DataTable.Cell>-</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Start Oven</DataTable.Cell>
                    <DataTable.Cell>17:30</DataTable.Cell>
                    <DataTable.Cell>-</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Dry Clothes</DataTable.Cell>
                    <DataTable.Cell>17:30</DataTable.Cell>
                    <DataTable.Cell>-</DataTable.Cell>
                </DataTable.Row>
            </View>
            <Button 
                mode="contained" 
                onPress={() => navigation.navigate('CreateTask')}>
                Add New
            </Button>
         
        </View>
    )
}

export default HomePage