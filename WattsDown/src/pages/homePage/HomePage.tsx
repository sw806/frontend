import {View, StyleSheet, ScrollView} from "react-native";
import {Button, DataTable, Divider, Menu, Text, TextInput} from "react-native-paper";
import * as React from 'react';
import MenuItem from "react-native-paper/lib/typescript/components/Menu/MenuItem";

const styles=StyleSheet.create({
    heading:{
        color: '#009FFF', 
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
      }
})

export default function HomePage() {
    const [minutes, setMinutes] = React.useState("");
    const [energy, setEnergy] = React.useState("");
    const [watts, setWatts] = React.useState("");
    return(
        <View>
            <Text 
                variant="displayLarge"
                style={styles.heading}
                > New Task </Text>
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
            <Button mode="contained">
                Add New
            </Button>
        </View>
    )
}