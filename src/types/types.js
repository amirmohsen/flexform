import stringProcessor from './String';
import numberProcessor from './Number';
import booleanProcessor from './Boolean';
import arrayProcessor from './Array';
import objectProcessor from './Object';
import dateProcessor from './Date';
import mixedProcessor from './Mixed';
import objectIdProcessor from './ObjectId';

export default [
	{
		name: 'String',
		processor: stringProcessor
	},
	{
		name: 'Number',
		processor: numberProcessor
	},
	{
		name: 'Boolean',
		processor: booleanProcessor
	},
	{
		name: 'Date',
		processor: dateProcessor
	},
	{
		name: 'ObjectId',
		processor: objectIdProcessor
	},
	{
		name: 'Mixed',
		processor: mixedProcessor
	},
	{
		name: 'Array',
		processor: arrayProcessor
	},
	{
		name: 'Object',
		processor: objectProcessor
	}
];