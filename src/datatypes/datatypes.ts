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
	startConstraints: TimeConstraint[];
	endConstraints: TimeConstraint[];
};

export type TimeConstraint = {
	id: string;
	startTime?: number;
	endTime?: number;
};
