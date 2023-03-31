import {Text, useTheme} from "react-native-paper";
import * as React from "react";
import {StyleSheet} from "react-native";

type HeadlineProps = {
    text: string
}

const Headline = (props:HeadlineProps) => {

    const theme = useTheme();

    const styles = StyleSheet.create({
        heading: {
            alignSelf: 'center',
            color: theme.colors.primary,
            fontSize: 57,
            margin: theme.mediumMargin,
        }
    })

    return (
        <Text variant="displayLarge" theme={theme} style={styles.heading}>
            {' '}
            {props.text}{' '}
        </Text>
    )


}



export default Headline;