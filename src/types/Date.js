import TypeNoMatch from './TypeNoMatchError';

export default ({name, type, defaultValue, data}) => {
	if(type === Date)  {
		if(!(data instanceof Date)) {
			if(typeof data === 'string' && !Number.isNaN(Date.parse(data))) {
				data = new Date(data);
				return data;
			}
			if(defaultValue === undefined) {
				data = Date.now();
			}
			else {
				data = defaultValue;
			}
		}
		return data;
	}
	throw new TypeNoMatch({name, type});
};