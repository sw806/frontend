import {
	calculateDuration,
	calculateEnergy,
	calculatePower,
} from '../src/utils/calculations';

describe('calculateDuration', () => {
	it('should calculate the duration correctly when given power and energy', () => {
		expect(calculateDuration(1, 0.5)).toEqual(30);
		expect(calculateDuration(2, 2)).toEqual(60);
		expect(calculateDuration(3, 1.5)).toEqual(30);
	});
});

describe('calculatePower', () => {
	it('should calculate the power correctly when given duration and energy', () => {
		expect(calculatePower(1.2, 2)).toEqual(100);
		expect(calculatePower(0.45, 1.5)).toEqual(200);
		expect(calculatePower(0.9, 0.75)).toEqual(50);
	});
});

describe('calculateEnergy', () => {
	it('should calculate the energy correctly when given duration and power', () => {
		expect(calculateEnergy(3, 1.5, 3)).toEqual(0.075);
		expect(calculateEnergy(3.5, 2, 4)).toEqual(0.1167);
		expect(calculateEnergy(4, 2.7, 2)).toEqual(0.18);
	});

	describe('calculateDuration', () => {
		it('should check that the duration calculation fails, when given incorrect power and energy', () => {
			expect(calculateDuration(1, 0.5)).not.toEqual(40);
			expect(calculateDuration(2, 2)).not.toEqual(40);
			expect(calculateDuration(3, 1.5)).not.toEqual(40);
		});
	});

	describe('calculatePower', () => {
		it('should check that the power calculation fails, when given incorrect duration and energy', () => {
			expect(calculatePower(1.2, 2)).not.toEqual(1);
			expect(calculatePower(1, 1)).not.toEqual(1.1);
			expect(calculatePower(1, 0.75)).not.toEqual(1);
			expect(calculatePower(0.75, 0.75)).not.toEqual(1.2);
		});
	});

	describe('calculateEnergy', () => {
		it('should check that the energy calculation fails, when given incorrect duration and power', () => {
			expect(calculateEnergy(3, 1.5, 3)).not.toEqual(1);
			expect(calculateEnergy(3.5, 2, 4)).not.toEqual(1);
			expect(calculateEnergy(4, 2.7, 2)).not.toEqual(1);
		});
	});
});
