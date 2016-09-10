import ExtendableError from 'extendable-error';

export default class FlexFormError extends ExtendableError {

	constructor(message) {
		super(`FlexFormError: ${message}`);
	}
}