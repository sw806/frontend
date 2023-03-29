export type Task = {
	id: string;
	name: string;
	duration?: number;
	energy?: number;
	power?: number;
	startDate?: number;
};

export type Options = {
	max_consumption: number;
}
