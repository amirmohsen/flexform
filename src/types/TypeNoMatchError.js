import FlexFormError from '../FlexFormError';

export default class TypeNoMatchError extends FlexFormError {

	constructor({name, type}) {
		super(`${name} field schema doesn't match ${type} type.`);
	}
}