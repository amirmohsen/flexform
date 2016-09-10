import update from 'react-addons-update';
import extend from 'extend';
import types from './types/types';
import TypeNoMatchError from './types/TypeNoMatchError';

export default class DataStore {

	initFieldData = ({name = null, schema, data}) => {
		let val;

		types.every(typeDefinition => {
			try {
				let type, defaultValue;

				if(typeof schema === 'object' && schema.type !== undefined && schema.type.type === undefined) {
					type = schema.type;
					defaultValue = schema.default;
				}
				else {
					type = schema;
				}

				val = typeDefinition.processor({name, type, defaultValue, data, next: this.initFieldData});
			}
			catch(e) {
				if(e instanceof TypeNoMatchError) {
					return true;
				}
				else {
					throw e;
				}
			}
			return false;
		});

		if(val === undefined) {
			val = null;
		}

		return val;
	};

	constructor({schema, data, onReady, onUpdate}) {
		this.schema = schema;
		this.data = data;
		this.onReady = onReady;
		this.onUpdate = onUpdate;
		this.initData();
	}

	initData() {
		this.data = this.initFieldData({schema: this.schema, data: extend(true, {}, this.data || {})});
		this.onReady(this.data);
	}

	save({key, data, schema}) {
		data = this.initFieldData({name: key.join('.'), data, schema});

		let modifier = {};

		key.reduce((modifierPart, keyPart, keyIndex) => {
			modifierPart[keyPart] = {};
			if(keyIndex === key.length - 1) {
				modifierPart[keyPart].$set = data;
				return modifier;
			}
			return modifierPart[keyPart];
		}, modifier);

		this.data = update(this.data, modifier);
		this.onUpdate(this.data);
	}
}