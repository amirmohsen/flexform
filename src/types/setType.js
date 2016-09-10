import types from './types';

export default ({name, processor}) => {
	let set = false;
	types.every(typeDefinition => {
		if(typeDefinition.name === name) {
			typeDefinition.processor = processor;
			set = true;
			return false;
		}
		return true;
	});

	if(!set) {
		types.unshift({
			name,
			processor
		});
	}
};