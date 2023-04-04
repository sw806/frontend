/**
 * Validates that the input string is a number using a regex. A comma and dot separator is allowed
 * @param inputString to be validated
 * @returns true if string is a valid number
 */

function isScientificNumber(str) {
	const regex = /^[-+]?[0-9]*\.?[0-9]+[eE][-+]?[0-9]+$/;

	if(regex.test(str)) {
		return true;
	} else {
		return false;
	}
};

function hasComma(str: string): boolean {
	const regex = /,/g;
	return regex.test(str);
};
  

const isValidNumber = (inputString: string) => {
	var input;
	if(inputString){
		input = Number(inputString);
	} else {
		return false;
	}
	
	if (isNaN(input) || isScientificNumber(input) || !isFinite(input) || hasComma(input)) {
		return false;
	} else {
		return true;
	}
};

export { isValidNumber };
