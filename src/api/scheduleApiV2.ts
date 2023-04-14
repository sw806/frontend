import { 
    Task as TaskModel,
    schedule as ScheduleModel,
    ResponseTask as ResponseTaskModel
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
}

interface MaximumPowerConsumption {
    maximum_consumption: number;
}

interface Schedule {
    tasks: ScheduledTask[];
    maximum_consumption?: MaximumPowerConsumption | null;
}

export module ScheduleApiV2 {
    function createTask(task: TaskModel): Task {
        const must_start_between: MustStartBetween[] = [] 
        const must_end_between: MustEndBetween[] = [] 

        return {
            id: task.id,
            duration: task.duration,
            power: task.power,
            must_start_between,
            must_end_between,
        }
    }

    function createScheduledTask(scheduledTask: ResponseTaskModel): ScheduledTask {
        return {
            task: createTask(scheduledTask.task),
            start_interval: {
                start: scheduledTask.start_interval.start,
                duration: scheduledTask.start_interval.duration,
            },
            cost: scheduledTask.cost
        }
    }

    function createSchedule(schedule: ScheduleModel): Schedule {
        const tasks: ScheduledTask[] = []
        for (let task of schedule.tasks) {
            tasks.push(createScheduledTask(task))
        }

        let maximum_consumption: MaximumPowerConsumption;

        return { tasks, maximum_consumption }
    }

    async function schedule(task: TaskModel, schedule: ScheduleModel): Promise<ScheduleModel> {
        return schedule
    }
}