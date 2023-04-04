import {
	calculateDuration,
	calculateEnergy,
	calculatePower,
} from '../src/utils/calculations';
import * as fc from 'fast-check';

describe('Fuzzed partitioning testing', () => {
	test('calculateDuration should work for power >= 0', () => {
		fc.assert(
			fc.property(
				fc.float({ min: 0 }), // power >= 0
				fc.float({ min: 0 }),
				fc.integer({ min: 1, max: 10 }),
				(power, energy, numDigts) => {
					expect(() =>
						calculateDuration(power, energy, numDigts)
					).not.toThrow();
				}
			)
		);
	});

	test('calculateDuration should fail for power < 0', () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1000, max: -1 }), // power < 0
				fc.float({ min: 0 }),
				fc.integer({ min: 1, max: 10 }),
				(power, energy, numDigts) => {
					expect(() =>
						calculateDuration(power, energy, numDigts)
					).toThrow('Power and energy must be greater than 0');
				}
			)
		);
	});

	test('calculatePower should work for energy >= 0', () => {
		fc.assert(
			fc.property(
				fc.float({ min: 0 }), // energy >= 0
				fc.float({ min: 0 }),
				fc.integer({ min: 1, max: 10 }),
				(energy, duration, numDigts) => {
					expect(() =>
						calculatePower(duration, energy, numDigts)
					).not.toThrow();
				}
			)
		);
	});

	test('calculatePower should fail for energy < 0', () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1000, max: -1 }), // energy < 0
				fc.float({ min: 0 }),
				fc.integer({ min: 1, max: 10 }),
				(energy, duration, numDigts) => {
					expect(() =>
						calculatePower(duration, energy, numDigts)
					).toThrow('Energy and duration must be greater than 0');
				}
			)
		);
	});

	test('calculateEnergy should work for power >= 0', () => {
		fc.assert(
			fc.property(
				fc.float({ min: 0 }), // power >= 0
				fc.float({ min: 1, max: 3 }),
				fc.integer({ min: 1, max: 10 }),
				(power, duration, numDigts) => {
					expect(() =>
						calculateEnergy(duration, power, numDigts)
					).not.toThrow();
				}
			)
		);
	});
	test('calculateEnergy should fail for power < 0', () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1000, max: -1 }), // power < 0
				fc.float({ min: 1, max: 3 }),
				fc.integer({ min: 1, max: 10 }),
				(power, duration, numDigts) => {
					expect(() =>
						calculateEnergy(duration, power, numDigts)
					).toThrow('Power and duration must be greater than 0');
				}
			)
		);
	});
});
