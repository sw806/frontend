/**
 * calculate the duration given power and energy
 * @param power in Watts
 * @param energy in kWh
 * @param numDigts number of digits after the decimal point
 * @returns duration as a Number
 */
const calculateDuration = (
	power: number,
	energy: number,
	numDigts: number = 0
) => {
	if (power < 0 || energy < 0) {
		throw new Error('Power and energy must be greater than 0.');
	}
	const duration = parseFloat(((energy * 60) / power).toFixed(numDigts));

	return duration;
};

/**
 * calculate the power given duration and energy
 * @param duration in minutes
 * @param energy in kWh
 * @param numDigts number of digits after the decimal point
 * @returns power as a Number
 */
const calculatePower = (
	duration: number,
	energy: number,
	numDigts: number = 0
) => {
	if (energy < 0 || (duration < 0 && !isNaN(energy) && !isNaN(duration))) {
		throw new Error('Energy and duration must be greater than 0.');
	}
	const power = parseFloat(((energy * 60) / duration).toFixed(numDigts));

	return power;
};

/**
 * calculate the energy given duration and power
 * @param duration in minutes
 * @param power in Watts
 * @param numDigts number of digits after the decimal point
 * @returns energy as a Number
 */
const calculateEnergy = (
	duration: number,
	power: number,
	numDigts: number = 0
) => {
	if (power < 0 || duration < 0) {
		throw new Error('Power and duration must be greater than 0.');
	}
	const energy = parseFloat(((duration / 60) * power).toFixed(numDigts));

	return energy;
};

export { calculateDuration, calculateEnergy, calculatePower };
