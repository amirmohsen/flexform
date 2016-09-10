import TypeNoMatch from './TypeNoMatchError';

export default ({name, type, defaultValue, data}) => {
	if(type === Number)  {
		if(!(typeof data === 'number')) {

			if(typeof data === 'string' && Number.isNaN(data = Number.parseFloat(data))) {
				data = undefined;
			}

			if(data === undefined || !(typeof data === 'number')) {
				if(defaultValue === undefined) {
					data = 0;
				}
				else {
					data = defaultValue;
				}
			}
		}
		return data;
	}
	throw new TypeNoMatch({name, type});
};