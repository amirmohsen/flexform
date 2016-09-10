import TypeNoMatch from './TypeNoMatchError';

export default ({name, type, defaultValue, data}) => {
	if(type === mongoose.Schema.Types.Mixed || type === Object || (typeof type === 'object' && Object.keys(type).length === 0))  {
		if(data === undefined) {
			if(defaultValue === undefined) {
				data = null;
			}
			else {
				data = defaultValue;
			}
		}
		return data;
	}
	throw new TypeNoMatch({name, type});
};