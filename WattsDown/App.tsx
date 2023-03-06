import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import routes from './src/config.ts/routes';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'HomePage'}>
        {routes.map((r,i) => (
          <Stack.Screen key={i} name={r.name}>
              {(props) => <r.component nameProp ={r.name} {...props} />} 
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
