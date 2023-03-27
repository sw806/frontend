import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageService } from '../src/utils/storage';
import { Task } from '../src/datatypes/datatypes';

jest.mock('@react-native-async-storage/async-storage', () => ({
	getAllKeys: jest.fn(),
	multiGet: jest.fn(),
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
}));

describe('StorageService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('getAllTasks should return all tasks from local storage', async () => {
		const tasks: Task[] = [
			{ id: '1', name: 'Task 1' },
			{ id: '2', name: 'Task 2' },
		];

		(AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue(['1', '2']);
		(AsyncStorage.multiGet as jest.Mock).mockResolvedValue([
			['1', JSON.stringify(tasks[0])],
			['2', JSON.stringify(tasks[1])],
		]);

		const result = await StorageService.getAllTasks();

		expect(result).toEqual(tasks);
	});

	test('saveTask should save task to local storage', async () => {
		const task: Task = {
			id: '1',
			name: 'Task 1',
		};

		(AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

		await StorageService.saveTask(task);

		expect(AsyncStorage.setItem).toHaveBeenCalledWith(
			task.id,
			JSON.stringify(task)
		);
	});

	test('deleteTask should delete task from local storage', async () => {
		const taskID = '1';

		await StorageService.deleteTask(taskID);

		expect(AsyncStorage.removeItem).toHaveBeenCalledWith(taskID);
	});

	test('updateTask should update task in local storage', async () => {
		const task: Task = {
			id: '1',
			name: 'Updated Task 1',
		};

		await StorageService.updateTask(task);

		expect(AsyncStorage.removeItem).toHaveBeenCalledWith(task.id);
		expect(AsyncStorage.setItem).toHaveBeenCalledWith(
			task.id,
			JSON.stringify(task)
		);
	});
});
