import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../datatypes/datatypes';

export module StorageService {
    export async function getData (){
        try {
            // get saved keys
            const keys = await AsyncStorage.getAllKeys();
            const data = await AsyncStorage.multiGet(keys);

            const d: readonly Task[] = data.map((d) => JSON.parse(d[1]))
            return d;
        } catch (error) {
            console.log(error);
        }
    };
}