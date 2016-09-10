import TypeNoMatch from './TypeNoMatchError';

export default ({name, type, defaultValue, data}) => {
	if(type === String)  {
		if(!(typeof data === 'string')) {
			if(defaultValue === undefined) {
				data = '';
			}
			else {
				data = defaultValue;
			}
		}
		return data;
	}
	throw new TypeNoMatch({name, type});
};