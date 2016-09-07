import stringType from './String';
import numberType from './Number';
import booleanType from './Boolean';
import arrayType from './Array';
import objectType from './Object';
import dateType from './Date';
import mixedType from './Mixed';
import objectIdType from './ObjectId';

// add subdocs

const types = {
	String: stringType,
	Number: numberType,
	Boolean: booleanType,
	Array: arrayType,
	Object: objectType,
	Date: dateType,
	Mixed: mixedType,
	objectIdType: objectIdType
};

export const setType = ({name, condition, defaultValue}) => {
	types[name] = {
		condition,
		defaultValue
	};
};

export default types;