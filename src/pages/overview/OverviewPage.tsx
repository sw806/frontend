import React from "react";
import {FC} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Card, Text} from "react-native-paper";
import {components, typography} from "../../styles/theme";
import {IStackScreenProps} from "../../library/Stack.ScreenProps";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamListBase, RouteProp} from "@react-navigation/native";
import OverviewInfoContainer from "../../components/OverviewInfoContainer";


const styles = StyleSheet.create({
    screenContainer: {
        ...components.containers.screen,
    },
    heading: {
        alignSelf: 'center',
        ...typography.pageHeader.medium,
    },
    cardContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        paddingTop: 4,
        paddingBottom: 4
    },
    infoContainer: {
        flexDirection: "row",
    }
})

type OverviewProps = {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<ParamListBase, any>;
}


const OverviewPage: FC = (props:OverviewProps) => {
    const { navigation, route } = props;
    // @ts-ignore
    const { id, name, duration, energy, power, startDate } = route.params.data;
    return (
        <View style={styles.screenContainer}>
            <Text variant="displayLarge" style={styles.heading}>
                {' '}
                {name}{' '}
            </Text>
            <Card style={styles.cardContainer} mode="elevated">
                <View>
                    <Card.Content>
                        <Text style={{marginLeft: "25%"}} variant="titleLarge">Task Overview</Text>
                    </Card.Content>
                </View>
                <View style={styles.infoContainer}>
                    <View>
                        <OverviewInfoContainer
                            icon="clock-outline"
                            text="somethingMore"
                        />
                        <OverviewInfoContainer
                            icon="clock-outline"
                            text="somethingMore"
                        />
                    </View>
                    <View>
                        <OverviewInfoContainer
                            icon="clock-outline"
                            text="somethingMore"
                        />
                        <OverviewInfoContainer
                            icon="clock-outline"
                            text="somethingMore"
                        />
                    </View>

                </View>

            </Card>
        </View>


    )
}

export default OverviewPage