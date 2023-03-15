import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../datatypes/datatypes';

export module StorageService {
    /**
     * retrives all saved tasks from the local storage
     * @returns array containing all the tasks from the local storage
     */
    export async function getAllTasks (){
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

    /**
     * Saves a task to local storage
     * @param task to be saved
     */
    export async function saveTask (task: Task) {
        try {
            // check for existing id
            const existingTask = await AsyncStorage.getItem(task.id);
            if (existingTask !== null) {
                // Generate a new id if the key already exists by calling itself recursively
                saveTask(task);
            }
            await AsyncStorage.setItem(task.id, JSON.stringify(task));
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Deletes a task from local storage
     * @param taskID 
     */
    export async function deleteTask (taskID: string){
        try {
            await AsyncStorage.removeItem(taskID);
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Updates a task by deleting it and adding a new one with same id
     * @param task 
     */
    export async function updateTask (task: Task){
        try {
			await AsyncStorage.removeItem(task.id);
			await AsyncStorage.setItem(task.id, JSON.stringify(task));
		} catch (error) {
			console.log(error);
		}
    }
}

