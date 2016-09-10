import TypeNoMatch from './TypeNoMatchError';

export default ({name, type, defaultValue, data}) => {
	if(type === mongoose.Schema.Types.ObjectId)  {
		if(!mongoose.Schema.Types.ObjectId.isValid(data)) {
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