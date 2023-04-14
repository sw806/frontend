export type Task = {
	id: string;
	name: string;
	duration: number;
	energy: number;
	power: number;
	startDate?: number;
	must_start_between?: { start_interval: Interval }[];
	must_end_between?: { end_interval: Interval }[];
	price?: number;
};

export type POSTObject = {
	tasks: Task[];
	schedule: schedule;
};

export type schedule = {
	tasks: ResponseTask[];
	maximum_power_consumption?: MaximumPowerConsumption;
};

export type ResponseTask = {
	task: Task;
	start_interval: Interval;
	cost: number;
};

export type MaximumPowerConsumption = {
	maximum_consumption: number;
};

export type Options = {
	max_consumption: number;
	notification_offset: number;
};

export type Interval = {
	id: string;
	start: number;
	end: number;
	duration: number;
};
