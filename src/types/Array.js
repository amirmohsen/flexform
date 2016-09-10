import TypeNoMatch from './TypeNoMatchError';

export default ({name, type, data, next}) => {
	if(Array.isArray(type) || type === Array) {
		let itemSchema;

		if(Array.isArray(type) && type.length > 0) {
			itemSchema = type[0];
		}
		else {
			itemSchema = mongoose.Schema.Types.Mixed;
		}

		if(!Array.isArray(data)) {
			data = [];
		}

		data = data.map(item => next({name: '$', schema: itemSchema, data: item}));

		return data;
	}
	throw new TypeNoMatch({name, type});
};