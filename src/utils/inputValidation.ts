/**
 * Validates that the input string is a number using a regex. A comma and dot separator is allowed
 * @param inputString to be validated
 * @returns true if string is a valid number
 */
const isValidNumber = (inputString: string) => {
	const regex = /^\d*\.?\d*$/;
	if (regex.test(inputString)) {
		return true;
	}

	return false;
};

export { isValidNumber };
