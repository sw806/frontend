import {StyleSheet, View} from "react-native";
import {Button} from "react-native-paper";
import {red50} from "react-native-paper/lib/typescript/styles/themes/v2/colors";


const styles = StyleSheet.create({
    btn: {
        width: "40%",
        marginLeft: "1%"
    },
    dualContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
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
const EditButtons = () => {
    return (
        <View style={styles.container}>
            <View style={styles.dualContainer}>
                <Button style={styles.btn} mode="elevated" buttonColor="#607d8b" textColor="#ffffff">Cancel</Button>
                <Button style={styles.btn} mode="elevated" buttonColor="#4caf50" textColor="#ffffff">Save</Button>
            </View>
            <View style={styles.singleContainer}>
                <Button style={styles.btn} mode="elevated" buttonColor="#d32f2f" textColor="#ffffff">Delete</Button>
            </View>
        </View>

    )

}

export default EditButtons