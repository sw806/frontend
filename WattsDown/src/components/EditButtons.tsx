import {StyleSheet, View} from "react-native";
import {Button} from "react-native-paper";


const styles = StyleSheet.create({
    btn: {
        height: 40,
        width: 150,
        margin: 10,
    },
    dualContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    singleContainer: {
        marginTop: "1%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    container: {
        display: "flex",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3%",
    }
})
const EditButtons = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.dualContainer}>
                <Button style={styles.btn} mode="elevated" buttonColor="#607d8b" textColor="#ffffff" onPress={() => props.cancel()}>Cancel</Button>
                <Button style={styles.btn} mode="elevated" buttonColor="#4caf50" textColor="#ffffff" onPress={() => props.save()}>Save</Button>
            </View>
            <View style={styles.singleContainer}>
                <Button style={styles.btn} mode="elevated" buttonColor="#d32f2f" textColor="#ffffff" onPress={() => props.delete()}>Delete</Button>
            </View>
        </View>

    )

}

export default EditButtons