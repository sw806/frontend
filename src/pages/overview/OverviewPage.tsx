import React from "react";
import {FC} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {components} from "../../styles/theme";

type OverviewProps = {

}

const styles = StyleSheet.create({
    screenContainer: {
        ...components.containers.screen,
    },
})


const OverviewPage: FC = (props:OverviewProps) => {
    return (
        <View style={styles.screenContainer}>
            <Text>
                YEs
            </Text>
        </View>

    )
}

export default OverviewPage