export type Task = {
	id: string;
	name: string;
	duration?: number;
	energy?: number;
	power?: number;
	startDate?: number;
	timeConstraints: TimeConstraints;
};

export type Options = {
	max_consumption: number;
};
export type TimeConstraints = {
	startConstraints: TimeInterval[];
	endConstraints: TimeInterval[];
}

export type TimeInterval = {
	id: string;
	startTime?: Number;
	endTime?: Number;
};

