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

    export async function saveData (task: Task) {
        try {
            // check for existing id
            const existingTask = await AsyncStorage.getItem(task.id);
            if (existingTask !== null) {
                // Generate a new id if the key already exists by calling itself recursively
                saveData(task);
                return;
            }
            await AsyncStorage.setItem(task.id, JSON.stringify(task));
        } catch (error) {
            console.log(error);
        }
    }
}

