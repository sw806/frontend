import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import routes from './src/config.ts/routes';
import React from 'react';
import {BottomTabBar, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./src/pages/homePage/HomePage";
import CreateTask from "./src/pages/createTask/CreateTask";
import EditTask from "./src/pages/editTask/EditTask";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
        <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
            tabBarButton: [
                "Edit Task",
            ].includes(route.name)
                ? () => {
                    return null;
                }
                : undefined,
        })}>
            <Tab.Screen name="Home" component={HomePage} options={{
                unmountOnBlur: true,
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => {
                    return <Icon name="home" size={size} color={color} />;
                },
                headerShown: false
            }}/>
            <Tab.Screen name="Create Task" component={CreateTask} options={{
                unmountOnBlur: true,
                tabBarLabel: "Create",
                tabBarIcon: ({ color, size }) => {
                    return <Icon name="plus" size={size} color={color} />;
                },
                headerShown: false
            }}/>
            <Tab.Screen name="Edit Task" component={EditTask} options={{
                unmountOnBlur: true,
                headerShown: false
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: 'center',
  },
});
