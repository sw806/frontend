import * as Device from 'expo-device';
import { Platform } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { Options, Task } from '../datatypes/datatypes';
import { StorageService } from './storage';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export module NotificationService {
	async function initialise(): Promise<void> {
		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;

			if (existingStatus != 'granted') {
				const { status } =
					await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus != 'granted') {
				console.log('Failed to get notification permission.');
				return;
			}
		}

		if (Platform.OS == 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}
	}

	export async function createTaskNotification(task: Task) {
		const options: Options = await StorageService.getSettings();

		let secondsBefore = 15 * 60;
		if (!options && !options.notification_offset) {
			secondsBefore = options.notification_offset * 60;
		}

		const startDate = new Date(task.startDate * 1000);
		const reminderDate = new Date(
			startDate.getTime() - secondsBefore * 1000
		);

		if (reminderDate.getTime() < Date.now()) {
			return;
		}

		console.log(
			`Creating notification for task ${
				task.id
			} at ${reminderDate.getTime()}.`
		);

		await initialise();
		await Notifications.scheduleNotificationAsync({
			identifier: task.id,
			content: {
				title: task.name,
			},
			trigger: reminderDate
		});
	}

	export async function removeTaskNotification(taskId: string) {
		await Notifications.cancelScheduledNotificationAsync(taskId);

		console.log(`Canceled notification for task ${taskId}.`);
	}
}
