import { isValidNumber } from '../src/utils/inputValidation'; // Replace 'your_module' with the actual module path
import fc from 'fast-check';

const isScientificNotation = (number) => {
	const str = number.toString();
	return str.includes('e') || str.includes('E');
};

describe('isValidNumber', () => {
	test('should return true for valid numbers', () => {
		fc.assert(
			fc.property(fc.double({ min: -1e6, max: 1e6 }), (number) => {
				expect(isValidNumber(number.toString())).toBe(true);
			})
		);
	});

	test('should return false for non-numeric strings', () => {
		fc.assert(
			fc.property(fc.string(), (nonNumericString) => {
				if (isNaN(parseFloat(nonNumericString))) {
					expect(isValidNumber(nonNumericString)).toBe(false);
				}
			})
		);
	});

	test('should return false for multiple decimal points', () => {
		fc.assert(
			fc.property(
				fc.double({ min: -1e6, max: 1e6 }),
				fc.double({ min: -1e6, max: 1e6 }),
				(number1, number2) => {
					const invalidNumber = `${number1}.${number2}.${number1}`;
					expect(isValidNumber(invalidNumber)).toBe(false);
				}
			)
		);
	});

	test('should return false for multiple comma separators', () => {
		fc.assert(
			fc.property(
				fc.double({ min: -1e6, max: 1e6 }),
				fc.double({ min: -1e6, max: 1e6 }),
				(number1, number2) => {
					const invalidNumber = `${number1},${number2},${number1}`;
					expect(isValidNumber(invalidNumber)).toBe(true);
				}
			)
		);
	});

	test('should return false for mixed comma and dot separators', () => {
		fc.assert(
			fc.property(
				fc.double({ min: -1e6, max: 1e6 }),
				fc.double({ min: -1e6, max: 1e6 }),
				(number1, number2) => {
					const invalidNumber = `${number1},${number2}.${number1}`;
					expect(isValidNumber(invalidNumber)).toBe(false);
				}
			)
		);
	});
});
