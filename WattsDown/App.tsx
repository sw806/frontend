import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateTask from './src/pages/createTask/createTask';

export default function App() {
  return (
    <View style={styles.container}>
      <CreateTask></CreateTask>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: 'center',
  },
});
