import TypeNoMatch from './TypeNoMatchError';

export default ({name, type, defaultValue, data}) => {
	if(type === Boolean)  {
		if(!(typeof data === 'boolean')) {
			if(typeof data === 'string') {
				if(!data || data.toLowerCase() === 'false' || data === '0') {
					data = false;
				}
				else if(data.toLowerCase() === 'true' || data === '1') {
					data = true;
				}
				else {
					data = undefined;
				}
			}
			else if(typeof data === 'number') {
				if(data === 0) {
					data = false;
				}
				else if(data === 1) {
					data = true;
				}
				else {
					data = undefined;
				}
			}

			if(data === undefined || !(typeof data === 'boolean')) {
				if(defaultValue === undefined) {
					data = false;
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