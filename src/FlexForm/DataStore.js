import update from 'react-addons-update';
import extend from 'extend';

export default class DataStore {

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

	initFieldData({schema, data}) {
		if(Array.isArray(schema) && schema.length > 0) {
			data.forEach(item => this.initFieldData({schema: schema[0], data: item}));
			return data;
		}
		else if(typeof schema === 'object') {
			for(let key in schema) {
				let schemaValue = schema[key];
				if(Array.isArray(schemaValue)) {
					if(!data[key]) {
						data[key] = [];
					}
					else if(data[key].length > 0 && schemaValue.length > 0) {
						data[key].forEach(item => this.initFieldData({schema: schemaValue[0], data: item}));
					}
				}
				else if(schemaValue === String)  {
					if(!data[key]) {
						data[key] = '';
					}
				}
				else if(schemaValue === Number)  {
					if(!data[key]) {
						data[key] = 0;
					}
				}
				else if(schemaValue === Boolean)  {
					if(!data[key]) {
						data[key] = false;
					}
				}
				else if(typeof schemaValue === 'object') {
					if(!data[key]) {
						data[key] = {};
					}
					if(Object.keys(schemaValue).length > 0) {
						this.initFieldData({schema: schemaValue, data: data[key]});
					}
				}
				else {
					if(!data[key]) {
						data[key] = null;
					}
				}
			}
		}
		else {
			return data;
		}

		return data;
	}

	save({key, data, schema}) {
		data = this.initFieldData({data, schema});

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