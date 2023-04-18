import {
	Task as TaskModel,
	Interval as IntervalModel,
	MaximumPowerConsumption as MaximumPowerConsumptionModel,
} from '../datatypes/datatypes';

interface DatetimeInterval {
	start: number;
	duration: number;
}

interface MustStartBetween {
	start_interval: DatetimeInterval;
}

interface MustEndBetween {
	end_interval: DatetimeInterval;
}

interface Task {
	duration: number;
	power: number;
	must_start_between?: MustStartBetween[];
	must_end_between?: MustEndBetween[];
	id?: string | null;
}

interface ScheduledTask {
	task: Task;
	start_interval: DatetimeInterval;
	cost: number;
	highest_price: number;
}

interface MaximumPowerConsumption {
	maximum_consumption: number;
}

interface Schedule {
	tasks: ScheduledTask[];
	maximum_power_consumption?: MaximumPowerConsumption | null;
}

interface PostSchedulesRequest {
	tasks: Task[];
	schedule: Schedule;
}

interface PostSchedulesResponse {
	tasks: Task[];
	schedule: Schedule;
}

export module ScheduleApiV2 {
	function createMustEndBetween(interval: IntervalModel): MustEndBetween {
		const difference = interval.end - interval.start;
		const differenceSeconds = difference.valueOf();
		return {
			end_interval: {
				start: interval.start,
				duration: differenceSeconds,
			},
		};
	}

	function createMustStartBetween(interval: IntervalModel): MustStartBetween {
		const difference = interval.end - interval.start;
		const differenceSeconds = difference.valueOf();
		return {
			start_interval: {
				start: interval.start,
				duration: differenceSeconds,
			},
		};
	}

	function createTask(task: TaskModel): Task {
		const mustStartBetween: MustStartBetween[] = [];
		const mustEndBetween: MustEndBetween[] = [];

		if (task.must_end_between) {
			for (const constraint of task.must_end_between) {
				mustEndBetween.push(
					createMustEndBetween(constraint.end_interval)
				);
			}
		}

		if (task.must_start_between) {
			for (const constraint of task.must_start_between) {
				mustStartBetween.push(
					createMustStartBetween(constraint.start_interval)
				);
			}
		}

		return {
			id: task.id,
			duration: task.duration * 60,
			power: task.power,
			must_start_between: mustStartBetween,
			must_end_between: mustEndBetween,
		};
	}

	function createScheduledTask(scheduledTask: TaskModel): ScheduledTask {
		if (!scheduledTask.startDate) {
			throw new Error(
				'Cannot create a schduled task without a start time.'
			);
		}

		if (!scheduledTask.price) {
			throw new Error('Cannot create a scheduled task without a price.');
		}

		return {
			task: createTask(scheduledTask),
			start_interval: {
				start: scheduledTask.startDate,
				// TODO: For now start intervals are not supported.
				duration: 0,
			},
			cost: scheduledTask.price,
			highest_price: scheduledTask.highestPrice
		};
	}

	function createTaskModelFromTask(
		task: Task,
		models: TaskModel[]
	): TaskModel {
		let model: TaskModel = undefined;
		if (task.id) {
			for (let current of models) {
				if (current.id === task.id) {
					model = current;
					break;
				}
			}
		}

		return {
			id: model.id,
			name: model.name,
			// The backend uses seconds so we convert from minutes.
			duration: model.duration * 60,
			energy: model.energy,
			power: model.power,
			must_start_between: model.must_start_between,
			must_end_between: model.must_end_between,
			highestPrice: model.highestPrice
		};
	}

	function createTaskModelFromScheduledTask(
		scheduleTask: ScheduledTask,
		models: TaskModel[]
	): TaskModel {
		let model: TaskModel = undefined;
		if (scheduleTask.task.id) {
			for (let current of models) {
				if (current.id === scheduleTask.task.id) {
					model = current;
					break;
				}
			}
		}

		return {
			id: model.id,
			name: model.name,
			duration: model.duration,
			energy: model.energy,
			power: model.power,
			must_start_between: model.must_start_between,
			must_end_between: model.must_end_between,
			// TODO: Start date whould be an interval when it is supported.
			startDate: scheduleTask.start_interval.start,
			price: scheduleTask.cost,
			highestPrice: scheduleTask.highest_price
		};
	}

	function createMaximumPowerConsumption(
		maximumConsumption: MaximumPowerConsumptionModel
	): MaximumPowerConsumption {
		return {
			maximum_consumption: maximumConsumption.maximum_consumption,
		};
	}

	export async function schedule(
		tasks: TaskModel[],
		constraints?: {
			maximumPowerConsumption?: MaximumPowerConsumptionModel;
		}
	): Promise<TaskModel[]> {
		const unsceduledTasks: Task[] = [];
		const scheduledTasks: ScheduledTask[] = [];

		// Create tasks (Scheduled as well as unscheduled).
		for (const task of tasks) {
			if (task.startDate && task.price) {
				scheduledTasks.push(createScheduledTask(task));
			} else {
				unsceduledTasks.push(createTask(task));
			}
		}

		// Create the base of the schdule with all its tasks.
		const schedule: Schedule = {
			tasks: scheduledTasks,
		};

		// Add the schedule constraints.
		if (
			constraints &&
			constraints.maximumPowerConsumption &&
			constraints.maximumPowerConsumption.maximum_consumption
		) {
			schedule.maximum_power_consumption = createMaximumPowerConsumption(
				constraints.maximumPowerConsumption
			);
		}

		// Form the request.
		const request: PostSchedulesRequest = {
			tasks: unsceduledTasks,
			schedule: schedule,
		};

		console.log('request: ' + JSON.stringify(request));

		const url = process.env.SERVER_IP + '/api/v2/schedules';

		console.log(`Schedules V2 fetching to ${url} with request ${request}.`);

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(request),
		});

		console.log(`Schedules V2 fetch got status code ${response.status}.`);

		if (!response.ok) {
			return Promise.reject('Failed fetching response.');
		}

		const result: PostSchedulesResponse = await response.json();

		console.log(`Schedules V2 fetch result was parsed to ${result}`);

		// Create the new list of task models.
		const finalTasks: TaskModel[] = [];
		for (let task of result.tasks) {
			finalTasks.push(createTaskModelFromTask(task, tasks));
		}
		for (let scheduledTask of result.schedule.tasks) {
			finalTasks.push(
				createTaskModelFromScheduledTask(scheduledTask, tasks)
			);
		}

		return Promise.resolve(finalTasks);
	}

	export async function scheduleTask(
		task: TaskModel,
		scheduledTasks: TaskModel[],
		constraints?: {
			maximumPowerConsumption?: MaximumPowerConsumptionModel;
		}
	): Promise<TaskModel> {
		for (const scheduledTask of scheduledTasks) {
			if (!scheduledTask.price && !scheduledTask.startDate) {
				return Promise.reject(
					`At least one task was not scheduled ${scheduledTask}.`
				);
			}
		}

		const tasks: TaskModel[] = [...scheduledTasks, task];
		const newSchedule = await schedule(tasks, constraints);

		// Find the specific scheduled task.
		for (const scheduledTask of newSchedule) {
			if (scheduledTask.id === task.id) {
				return Promise.resolve(scheduledTask);
			}
		}

		return Promise.reject(
			`Failed finding the scheduled task as no ID "${task.id}" matched any in the new schedule.`
		);
	}

	export async function reschedule(
		tasks: TaskModel[],
		scheduledTasks: TaskModel[],
		constraints?: {
			maximumPowerConsumption?: MaximumPowerConsumptionModel;
		}
	): Promise<TaskModel[]> {
		// Check that all scheduled tasks are scheduled.
		for (const scheduledTask of scheduledTasks) {
			if (!scheduledTask.startDate && !scheduledTask.price) {
				return Promise.reject(
					`At least one task was not scheduled ${scheduledTask}.`
				);
			}
		}

		// Deschedule all tasks that are already scheduled.
		for (let task of tasks) {
			task.startDate = undefined;
			task.price = undefined;
		}

		return schedule(tasks, constraints);
	}

	export async function rescheduleTask(
		task: TaskModel,
		scheduledTasks: TaskModel[],
		constraints?: {
			maximumPowerConsumption?: MaximumPowerConsumptionModel;
		}
	): Promise<TaskModel> {
		const newSchedule = await reschedule(
			[task],
			scheduledTasks,
			constraints
		);

		// Find the specific scheduled task.
		for (const scheduledTask of newSchedule) {
			if (scheduledTask.id === task.id) {
				return Promise.resolve(scheduledTask);
			}
		}

		return Promise.reject(
			'Failed finding the scheduled task as no ID matched any in the new schedule.'
		);
	}
}
