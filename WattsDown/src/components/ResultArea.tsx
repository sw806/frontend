import {Avatar, Card, Text} from "react-native-paper";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    content: {
        display: "flex",
        alignItems: "center"
    },
    card : {
        backgroundColor: "#009FFF",
        marginTop: "1%"
    },
    text: {
        fontSize: 24
    },
    icon: {
        backgroundColor: 'rgba(255, 255, 255, 0)'
    }
})

type ResultProps= {
    time: string
}
const ResultArea = (props: ResultProps) =>  {
    return(
        <Card style={styles.card}>
            <Card.Content style={styles.content}>
                <Avatar.Icon size={70} icon="clock-outline" style={styles.icon}/>
                <Text style={styles.text}>{props.time}</Text>
            </Card.Content>
        </Card>
    )
}

export default ResultArea