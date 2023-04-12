export type Task = {
	id: string;
	name: string;
	duration?: number;
	energy?: number;
	power?: number;
	startDate?: number;
	must_start_between: [{start_interval: Interval}];
	must_end_between: [{end_interval: Interval}];
};

export type POSTObject = {
	tasks: [Task];
	schedule: schedule;
	maximum_power_consumption?: MaximumPowerConsumption;
}

export type schedule = {
	tasks: [RasponseTask];
}

export type RasponseTask = {
	duration: number;
	power: number;
	must_start_between: [{start_interval: Interval}];
	must_end_between: [{end_interval: Interval}];
	start_interval: Interval;
	cost: number;
};

export type MaximumPowerConsumption = {
	maximum_consumption: number
}

export type Options = {
	max_consumption: number;
};

export type TimeConstraint = {
	id: string;
	startTime?: number;
	endTime?: number;
};


export type Interval = {
	start: number;
	duration: number;
};

