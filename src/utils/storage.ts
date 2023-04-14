import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, Options, RasponseTask } from '../datatypes/datatypes';

const settings_id: string = '@Settings_key';
const schedule_id: string = '@Schedule_key';
const task_id: string = '@Task_key';
const templateTask_id: string = '@TemplateTask_key';

type TaskEnc = {
	[id: string]: Task
}

export module StorageService {
	/**
	 * retrives all saved tasks from the local storage
	 * @returns array containing all the tasks from the local storage
	 */
	export async function getAllTasks() {
		try {
			const data = await AsyncStorage.getItem(task_id);

			if (data) {
				const t: TaskEnc = JSON.parse(data);
				const d: readonly Task[] = Object.values(t) ?? [];
				return d;
			}

			return [];
		} catch (error) {
			console.log(error);
		}
	}

	/**
		 * retrives all saved tasks from the local storage
		 * @returns array containing all the tasks from the local storage
		 */
	export async function getAllTemplateTasks() {
		try {
			const data = await AsyncStorage.getItem(templateTask_id);

			if (data) {
				const t: TaskEnc = JSON.parse(data);
				const d: readonly Task[] = Object.values(t) ?? [];
				return d;
			}

			return [];
		} catch (error) {
			console.log(error);
		}
	}

	export async function getSettings() {
		try {
			const data = await AsyncStorage.getItem(settings_id);

			const d: Options = JSON.parse(data);
			return d;
		} catch (error) {
			console.log(error);
			const d: Options = {max_consumption: 0}
			return d
		}
	}

	export async function getSchedule() {
		try {
			const data = await AsyncStorage.getItem(schedule_id);

			const d: RasponseTask = JSON.parse(data);
			return d;
		} catch (error) {
			console.log(error);
			return undefined
		}
	}

	/**
	 * Saves a task to local storage
	 * @param task to be saved
	 */
	export async function saveTask(task: Task) {
		try {
			// check for existing id
			const data = await AsyncStorage.getItem(task_id);

			const tasks: TaskEnc = data ? JSON.parse(data) : {}
			tasks[task.id] = task;

			await AsyncStorage.setItem(task_id, JSON.stringify(tasks));

			await saveTemplateTask(task)
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Saves a task to local storage
	 * @param task to be saved
	 */
	export async function saveTemplateTask(task: Task) {
		try {
			// check for existing id
			const data = await AsyncStorage.getItem(templateTask_id);

			const t: TaskEnc = data ? JSON.parse(data) : {}
			t[task.name] = task;

			await AsyncStorage.setItem(templateTask_id, JSON.stringify(t));
		} catch (error) {
			console.log(error);
		}
	}

	export async function saveSettings(task: Options) {
		try {
			await AsyncStorage.setItem(settings_id, JSON.stringify(task));
		} catch (error) {
			console.log(error);
		}
	}

	export async function saveSchedule(schedule: RasponseTask) {
		try {
			await AsyncStorage.setItem(schedule_id, JSON.stringify(schedule));
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Deletes a task from local storage
	 * @param taskID
	 */
	export async function deleteTask(taskID: string) {
		try {
			// check for existing id
			const data = await AsyncStorage.getItem(task_id);

			const tasks: TaskEnc = data ? JSON.parse(data) : {}
			delete tasks[taskID];

			await AsyncStorage.setItem(task_id, JSON.stringify(tasks));
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Updates a task by deleting it and adding a new one with same id
	 * @param task
	 */
	export async function updateTask(task: Task) {
		try {
			await saveTask(task);
		} catch (error) {
			console.log(error);
		}
	}
}
