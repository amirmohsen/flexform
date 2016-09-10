import TypeNoMatch from './TypeNoMatchError';

export default ({name, type, data, next}) => {
	if(typeof type === 'object') {
		if(typeof data !== 'object') {
			data = {};
		}

		let availableKeys = [];

		for(let itemName in type) {
			let itemSchema = type[itemName];
			data[itemName] = next({name: itemName, schema: itemSchema, data: data[itemName]});
			availableKeys.push(itemName);
		}

		Object.keys(data)
			.filter(key => !availableKeys.includes(key))
			.forEach(key => delete data[key]);

		return data;
	}

	throw new TypeNoMatch({name, type});
};